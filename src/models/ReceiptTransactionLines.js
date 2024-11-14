const Sequelize = require("sequelize");
const dbConn = require("../data-access/dbConn");

const ReceiptTransctionLines = dbConn.define("receipt_transaction_lines", {
  receipt_transaction_line_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  amt_lines: {
    type: Sequelize.FLOAT,
    allowNull: false,
    unique: false,
  },
  explanation:{
    type:Sequelize.TEXT,
    allowNull: false,
    unique: false
}
});

module.exports = ReceiptTransctionLines
