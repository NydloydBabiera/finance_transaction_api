const { Sequelize } = require("sequelize");
const dbConn = require("../data-access/dbConn");
const { AccountCharts, SubsidiaryAccounts } = require("../models");

const getAccountDetails = async (param) => {
  const account = await AccountCharts.findOne({
    where: {
      account_id: {
        [Sequelize.Op.eq]: param,
      },
    },
  })
    .then((account) => {
      return account.dataValues;
    })
    .catch((error) => console.log(error));

  return account;
};

const getAccountPerCode = async (param) => {
  const account = await AccountCharts.findOne({
    where: {
      account_code: {
        [Sequelize.Op.eq]: param,
      },
    },
  })
    .then((account) => {
      return account.dataValues;
    })
    .catch((error) => console.log(error));

  return account;
};

const getSubsidiaryPerCode = async (param) => {
  const subsidiary = await SubsidiaryAccounts.findOne({
    where: {
      code: {
        [Sequelize.Op.eq]: param,
      },
    },
  })
    .then((sub) => {
      return sub?.dataValues;
    })
    .catch((error) => {console.log(error)});

  return subsidiary;
};

module.exports = { getAccountDetails, getAccountPerCode, getSubsidiaryPerCode };
