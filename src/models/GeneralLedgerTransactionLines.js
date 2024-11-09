const Sequelize = require('sequelize')
const dbConn = require('../data-access/dbConn')

const GeneralLedgerTransactionLines = dbConn.define('gl_transaction_lines',{
    gl_transaction_line_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    debit:{
        type:Sequelize.FLOAT,
        allowNull: false,
        unique: false
    },
    credit:{
        type:Sequelize.FLOAT,
        allowNull: false,
        unique: false
    },


})

module.exports = GeneralLedgerTransactionLines