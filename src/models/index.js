const AccountCharts = require("./AccountCharts");
const GeneralLedgerTransactionLines = require("./GeneralLedgerTransactionLines");
const GeneralLedgerTransactions = require("./GeneralLedgerTransactions");
const InvoiceReceipt = require("./InvoiceReceipt");
const ReceiptTransaction = require("./ReceiptTransaction");
const ReceiptTransctionLines = require("./ReceiptTransactionLines");
const SubsidiaryAccountMatching = require("./SubsidiaryAccountMatching");
const SubsidiaryAccounts = require("./SubsidiaryAccounts");

// account and gl_transaction foreign key
AccountCharts.hasMany(GeneralLedgerTransactions, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "account_id",
  as: "entry_account",
});
GeneralLedgerTransactions.belongsTo(AccountCharts, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "account_id",
  as: "entry_account",
});
// account subsidiary matchin matching foreign key
AccountCharts.hasMany(SubsidiaryAccountMatching, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "account_id",
  as: "subsidiary_account",
});

SubsidiaryAccountMatching.belongsTo(AccountCharts, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "account_id",
  as: "subsidiary_account",
});

SubsidiaryAccounts.hasMany(SubsidiaryAccountMatching, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "subsidiary_id",
  as: "subsidiary",
});

SubsidiaryAccountMatching.belongsTo(SubsidiaryAccounts, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "subsidiary_id",
  as: "subsidiary",
});

//gl transaction line subsidiary
SubsidiaryAccounts.hasMany(GeneralLedgerTransactionLines, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "subsidary_id",
  as: "subsidiary_account",
});
GeneralLedgerTransactionLines.belongsTo(SubsidiaryAccounts, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "subsidary_id",
  as: "subsidiary_account",
});

//gl transaction and gl transaction line
GeneralLedgerTransactions.hasMany(GeneralLedgerTransactionLines, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "gl_transaction_id",
  as: "gl_transaction",
});
GeneralLedgerTransactionLines.belongsTo(GeneralLedgerTransactions, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "gl_transaction_id",
  as: "gl_transaction",
});

// gl transaction to gl transaction lines
GeneralLedgerTransactionLines.hasMany(GeneralLedgerTransactions, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "account_id",
  as: "gl_account",
});
GeneralLedgerTransactions.belongsTo(GeneralLedgerTransactionLines, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "account_id",
  as: "gl_account",
});

// invoice receipt
SubsidiaryAccounts.hasMany(InvoiceReceipt, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "subsidiary_id",
  as: "invoice_subsidiary",
});
InvoiceReceipt.belongsTo(SubsidiaryAccounts, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "subsidiary_id",
  as: "invoice_subsidiary",
});
AccountCharts.hasMany(InvoiceReceipt, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "account_id",
  as: "invoice_account",
});
InvoiceReceipt.belongsTo(AccountCharts, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "account_id",
  as: "invoice_account",
});
// receipt transaction
SubsidiaryAccounts.hasMany(ReceiptTransaction, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "subsidiary_id",
  as: "receipt_subsidiary",
});
InvoiceReceipt.belongsTo(SubsidiaryAccounts, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "subsidiary_id",
  as: "receipt_subsidiary",
});
// receipt transaction lines
InvoiceReceipt.hasMany(ReceiptTransctionLines, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "invoice_id",
  as: "invoice_receipt_line",
});
ReceiptTransctionLines.belongsTo(InvoiceReceipt, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "receipt_transaction_id",
  as: "invoice_receipt_line",
});
ReceiptTransaction.hasMany(ReceiptTransctionLines, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "receipt_transaction_id",
  as: "receipt_transaction",
});
ReceiptTransctionLines.belongsTo(ReceiptTransaction, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  foreignKey: "receipt_transaction_id",
  as: "receipt_transaction",
});
module.exports = {
  AccountCharts,
  GeneralLedgerTransactionLines,
  GeneralLedgerTransactions,
  SubsidiaryAccountMatching,
  SubsidiaryAccounts,
};
