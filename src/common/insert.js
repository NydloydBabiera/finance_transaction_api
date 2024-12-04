const dbConn = require("../data-access/dbConn");
const { SubsidiaryAccounts, AccountCharts } = require("../models");

const createSubsidiary = async (subDetails) => {
  const createSub = await dbConn.transaction();

  const newSubsidiary = await SubsidiaryAccounts.create(subDetails, {
    transaction: createSub,
  })
    .then((subsidiary) => {
      return subsidiary;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

  await createSub.commit();
  return newSubsidiary;
};

const creatAccount = async (accountDetails) => {
  const createAcc = await dbConn.transaction();
  console.log(accountDetails)
  const newAcc = await AccountCharts.create(accountDetails, {
    transaction: createAcc,
  })
    .then((account) => {
      return account;
    })
    .catch((error) => {
      console.log(`ERROR:${error}`);
      return error;
    });

  await createAcc.commit();
  return newAcc;
};

module.exports = { createSubsidiary, creatAccount };
