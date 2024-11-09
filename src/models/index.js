const AccountCharts = require("./AccountCharts");
const GeneralLedgerTransactionLines = require("./GeneralLedgerTransactionLines");
const GeneralLedgerTransactions = require("./GeneralLedgerTransactions");
const SubsidiaryAccountMatching = require("./SubsidiaryAccountMatching");
const SubsidiaryAccounts = require("./SubsidiaryAccounts");

// account and gl_transaction foreign key
AccountCharts.hasMany(GeneralLedgerTransactions,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'account_id',
    as: 'entry_account'
})
GeneralLedgerTransactions.belongsTo(AccountCharts,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'account_id',
    as: 'entry_account'
})
// account subsidiary matchin matching foreign key
AccountCharts.hasMany(SubsidiaryAccountMatching,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'account_id',
    as: 'subsidiary_account'
})

SubsidiaryAccountMatching.belongsTo(AccountCharts,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'account_id',
    as: 'subsidiary_account'
})

SubsidiaryAccounts.hasMany(SubsidiaryAccountMatching,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'subsidiary_id',
    as: 'subsidiary'
})

SubsidiaryAccountMatching.belongsTo(SubsidiaryAccounts,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'subsidiary_id',
    as: 'subsidiary'
})

//gl transaction line subsidiary
SubsidiaryAccounts.hasMany(GeneralLedgerTransactionLines,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'subsidary_id',
    as: 'subsidiary_account'
})
GeneralLedgerTransactionLines.belongsTo(SubsidiaryAccounts,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'subsidary_id',
    as: 'subsidiary_account'
})

//gl transaction and gl transaction line
GeneralLedgerTransactionLines.hasMany(GeneralLedgerTransactions,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'gl_transaction_id',
    as: 'gl_transaction'
})
GeneralLedgerTransactions.belongsTo(GeneralLedgerTransactionLines,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'gl_transaction_id',
    as: 'gl_transaction'
})


// gl transaction to gl transaction lines
GeneralLedgerTransactionLines.hasMany(GeneralLedgerTransactions,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'account_id',
    as: 'gl_account'
})
GeneralLedgerTransactions.belongsTo(GeneralLedgerTransactionLines,{
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: 'account_id',
    as: 'gl_account'
})

module.exports = {AccountCharts,  GeneralLedgerTransactionLines, GeneralLedgerTransactions, SubsidiaryAccountMatching, SubsidiaryAccounts}