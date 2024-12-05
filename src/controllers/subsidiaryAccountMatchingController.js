const { where } = require("sequelize");
const dbConn = require("../data-access/dbConn");
const { SubsidiaryAccountMatching, AccountCharts, SubsidiaryAccounts } = require("../models");

const matchSubsidiaryAccount = async (req, res) => {
  const createSubAccMatching = await dbConn.transaction();

  const subAccIds = req.body;
const {account_id, subsidiary_id} = subAccIds
  try {

    const isMatchingExist = await SubsidiaryAccountMatching.findAll({
      where:[
        {account_id: account_id},
        {subsidiary_id: subsidiary_id}
      ]
    })

    if(isMatchingExist){
      throw new Error("Matching already exist")
    }

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