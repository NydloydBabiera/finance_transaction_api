const { createSubsidiary, creatAccount } = require("../common/insert");
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

  const { glEntries } = req.body;

  for await (const entry of glEntries) {
    const {
      accno,
      accname,
      docno,
      date,
      particulars,
      code,
      name,
      debit,
      credit,
    } = entry;
    // get the account details
    let accountGL = await getAccountPerCode(accno);
    //get subsidiary details
    let subsidiary = await getSubsidiaryPerCode(code);

    const subsidiaryData = {
      code,
      subsidiary_name: name,
      description: `Migration:${new Date()}`,
    };

    const accntDetails = {
      account_code: accno,
      account_name: accname,
      description: `Migration:${new Date().toDateString('yyyy-MM-dd')}`,
    };


    if (!subsidiary) {
      subsidiary = await createSubsidiary(subsidiaryData);
    }

    if (!accountGL) {
      accountGL = await creatAccount(accntDetails);
    }

    const glData = {
      document_no: docno,
      explanation: particulars,
      posted_date: date,
      debit: debit || 0,
      credit: credit || 0,
      account_id: accountGL.account_id,
      subsidiary_id: subsidiary.subsidiary_account_id,
    };

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
