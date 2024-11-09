const dbConn = require("../data-access/dbConn");
const { AccountCharts } = require("../models");

const addNewAccount = async (req, res) => {
  const createAccount = await dbConn.transaction();

  const accountDetails = req.body;

  try {
    const addAccount = await AccountCharts.create(accountDetails, {
      transaction: createAccount,
    });

    await createAccount.commit();

    res.status(200).json(addAccount);
  } catch (error) {
    res.json(error);
    await createAccount.rollback();
  }
};

const getAllAccounts = async (req, res) => {
   await AccountCharts.findAll()
    .then((accounts) => res.json(accounts))
    .catch((error) => console.log(error));
};

module.exports = { addNewAccount, getAllAccounts };
