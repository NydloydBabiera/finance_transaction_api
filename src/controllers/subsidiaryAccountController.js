const dbConn = require("../data-access/dbConn");
const { SubsidiaryAccounts } = require("../models");

const addNewSubsidiary = async (req, res) => {
  const creatSubsidiary = await dbConn.transaction();

  const subsidiaryDetails = req.body;

  try {
    const addSubsidiary = await SubsidiaryAccounts.create(subsidiaryDetails, {
      transaction: creatSubsidiary,
    });
    await creatSubsidiary.commit()

    res.status(200).json(addSubsidiary)
  } catch (error) {
    res.json(error)
    await createAccount.rollback()
  }
};

const getAllSubsidiary = async(req,res) =>{
    await SubsidiaryAccounts.findAll()
    .then((subsidiary) => res.json(subsidiary))
    .catch((error) => console.log(error));
}

module.exports = {addNewSubsidiary, getAllSubsidiary}
