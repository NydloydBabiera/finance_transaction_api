const Sequelize = require('sequelize')
const dbConn = require('../data-access/dbConn')

const GeneralLedgerTransactions = dbConn.define('gl_transactions',{
    gl_transactions_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    document_no:{
        type:Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    date_created:{
        type:Sequelize.DATE,
        allowNull: false,
        unique: true
    },
    document_no:{
        type:Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    explanation:{
        type:Sequelize.TEXT,
        allowNull: false,
        unique: false
    },
    amt:{
        type:Sequelize.FLOAT,
        allowNull: false,
        unique: true
    },
    posted_date:{
        type:Sequelize.DATE,
        allowNull: false,
        unique: false
    },
})

module.exports = GeneralLedgerTransactions