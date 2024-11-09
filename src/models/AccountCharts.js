const Sequelize = require('sequelize')
const dbConn = require('../data-access/dbConn')

const AccountCharts = dbConn.define('account_charts',{
    account_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    account_code:{
        type:Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    account_name:{
        type:Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description:{
        type:Sequelize.TEXT,
        allowNull: false,
        unique: false
    },
    nature_account:{
        type:Sequelize.ENUM('DR','CR')
    }
})

module.exports = AccountCharts