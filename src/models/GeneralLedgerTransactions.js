const Sequelize = require("sequelize");
const dbConn = require("../data-access/dbConn");

const GeneralLedgerTransactions = dbConn.define("gl_transactions", {
  gl_transactions_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  document_no: {
    type: Sequelize.STRING,
    allowNull: false
  },
  explanation: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: false,
  },
  debit: {
    type: Sequelize.FLOAT,
    allowNull: false,
    unique: false,
  },
  credit: {
    type: Sequelize.FLOAT,
    allowNull: false,
    unique: false,
  },
  posted_date: {
    type: Sequelize.DATE,
    allowNull: false,
    unique: false,
  },
});

module.exports = GeneralLedgerTransactions;
