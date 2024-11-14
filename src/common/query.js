const { Sequelize } = require("sequelize");
const dbConn = require("../data-access/dbConn");
const { AccountCharts } = require("../models");

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

module.exports = { getAccountDetails };
