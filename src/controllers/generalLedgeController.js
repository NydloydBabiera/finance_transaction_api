const { createSubsidiary } = require("../common/insert");
const { getAccountPerCode, getSubsidiaryPerCode } = require("../common/query");
const dbConn = require("../data-access/dbConn");
const {
  GeneralLedgerTransactions,
  GeneralLedgerTransactionLines,
  AccountCharts,
  SubsidiaryAccounts,
} = require("../models");

const postGLTransaction = async (req, res) => {
  const postGL = await dbConn.transaction();

  const { accountCode, glEntries } = req.body;

  // get the account details
  const accountGL = await getAccountPerCode(accountCode);

  for await (const entry of glEntries) {
    const {
      documentNo,
      datePosted,
      explanation,
      subsidiaryData,
      debit,
      credit,
    } = entry;
    let subsidiary = await getSubsidiaryPerCode(subsidiaryData.code);

    if (!subsidiary) {
      subsidiary = await createSubsidiary(subsidiaryData);
    }

    const glData = {
      document_no: documentNo,
      explanation: explanation,
      posted_date: datePosted,
      debit: debit || 0,
      credit: credit || 0,
      account_id: accountGL.account_id,
      subsidiary_id: subsidiary.subsidiary_account_id,
    };

    console.log("glData:", glData);

    try {
      const recordGL = await GeneralLedgerTransactions.create(glData, {
        transaction: postGL,
      });

      glData.gl_transaction_id = recordGL.gl_transaction_id;

      const postTransactionLines = await GeneralLedgerTransactionLines.create(
        glData,
        { transaction: postGL }
      );
      await postGL.commit();

      res.status(200).json({ recordGL, postTransactionLines });
    } catch (error) {
      res.json(error);
      console.log(error);
      await postGL.rollback();
    }
  }
};

const getAllGLtransactions = async (req, res) => {
  await GeneralLedgerTransactions.findAll({
    include: [
      {
        model: GeneralLedgerTransactionLines,
        as: "gl_transaction",
        include: [
          {
            model: SubsidiaryAccounts,
            as: "subsidiary_account",
          },
        ],
      },
      {
        model: AccountCharts,
        as: "entry_account",
      },
    ],
  })
    .then((gltransactions) => res.status(200).json(gltransactions))
    .catch((error) => console.log(error));
};

const accountDetails = async (account_id) => {
  const account = await AccountCharts.findOne({ account_id: account_id });

  return account;
};

module.exports = { postGLTransaction, getAllGLtransactions };
