const Sequelize = require("sequelize");
const dbConn = require("../data-access/dbConn");

const InvoiceReceipt = dbConn.define("invoice_receipt", {
  invoice_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  document_no: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
  },
  invoice_date: {
    type: Sequelize.DATE,
    allowNull: false,
    unique: false,
  },
  due_date:{
    type: Sequelize.DATE,
    allowNull: false,
    unique: false,
  },
  description:{
    type: Sequelize.TEXT,
    allowNull: false,
    unique: false,
  }
});


module.exports = InvoiceReceipt