const Sequelize = require('sequelize')
const dbConn = require('../data-access/dbConn')

const SubsidiaryAccounts = dbConn.define('subsidiary_accounts',{
    subsidiary_account_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    code:{
        type:Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    subsidiary_name:{
        type:Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description:{
        type:Sequelize.TEXT,
        allowNull: true,
        unique: false
    }

})

module.exports = SubsidiaryAccounts