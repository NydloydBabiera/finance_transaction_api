const Sequelize = require("sequelize");
const dbConn = require("../data-access/dbConn");

const ReceiptTransaction = dbConn.define("receipt_transaction", {
  receipt_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  document_no: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  document_date: {
    type: Sequelize.DATE,
    allowNull: false,
    unique: false,
  },
  transaction_type: {
    type: Sequelize.ENUM("CASH", "BANK", "CHECK"),
    allowNull: false,
    unique: false,
  },
  amt_paid: {
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

module.exports = ReceiptTransaction;
