const Sequelize = require('sequelize')
const dbConn = require('../data-access/dbConn')

const SubsidiaryAccountMatching = dbConn.define('subsidiary_account_matching',{
    sub_account_matching_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
})

module.exports = SubsidiaryAccountMatching