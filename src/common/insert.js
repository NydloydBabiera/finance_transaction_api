const dbConn = require("../data-access/dbConn");
const { SubsidiaryAccounts } = require("../models");
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

module.exports = { createSubsidiary };
