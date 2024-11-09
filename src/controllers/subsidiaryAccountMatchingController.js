const dbConn = require("../data-access/dbConn");
const { SubsidiaryAccountMatching, AccountCharts, SubsidiaryAccounts } = require("../models");

const matchSubsidiaryAccount = async (req, res) => {
  const createSubAccMatching = await dbConn.transaction();

  const subAccIds = req.body;

  try {
    const addSubAccMatching = await SubsidiaryAccountMatching.create(subAccIds, {
      transaction: createSubAccMatching,
    });

    await createSubAccMatching.commit();
    res.status(200).json(addSubAccMatching);
  } catch (error) {
    console.log(error)
    res.json(error.message);
    await createSubAccMatching.rollback();
  }
};

const getAllSubAcctMatching = async (req, res) => {
  await SubsidiaryAccountMatching.findAll({
    include: [
      {
        model: AccountCharts,
        as: "subsidiary_account",
      },
      {
        model: SubsidiaryAccounts,
        as: "subsidiary",
      },
    ],
  }).then((subacctMatching) => res.status(200).json(subacctMatching))
  .catch((error) => res.json(error));
};

module.exports = {matchSubsidiaryAccount, getAllSubAcctMatching}