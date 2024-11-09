const dbConn = require("../data-access/dbConn");
const {
  GeneralLedgerTransactions,
  GeneralLedgerTransactionLines,
  AccountCharts,
  SubsidiaryAccounts,
} = require("../models");

const postGLTransaction = async (req, res) => {
  const postGL = await dbConn.transaction();

  const { glTransactions, glLines } = req.body;

  try {
    const postTransaction = await GeneralLedgerTransactions.create(
      glTransactions,
      { transaction: postGL }
    );

    glLines.gl_transaction_id = postTransaction.gl_transaction_id;

    const postTransactionLines = await GeneralLedgerTransactionLines.create(
      glLines,
      { transaction: postGL }
    );

    await postGL.commit();

    res.status(200).json({ postTransaction, postTransactionLines });
  } catch (error) {
    res.json(error);
    console.log(error);
    await postGL.rollback();
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

const accountDetails = async(account_id) =>{
   const account =  await AccountCharts.findOne({account_id: account_id})

   return account
}

module.exports = { postGLTransaction, getAllGLtransactions };
