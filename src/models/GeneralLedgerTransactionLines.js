const Sequelize = require("sequelize");
const dbConn = require("../data-access/dbConn");

const GeneralLedgerTransactionLines = dbConn.define("gl_transaction_lines", {
  gl_transaction_line_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  document_no: {
    type: Sequelize.STRING,
    allowNull: false,
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
  explanation: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: false,
  },
});

module.exports = GeneralLedgerTransactionLines;
