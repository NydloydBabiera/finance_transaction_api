const { postTransactions } = require("../business/PostTransactions");
const { getAccountDetails } = require("../common/query");
const dbConn = require("../data-access/dbConn");
const ReceiptTransaction = require("../models/ReceiptTransaction");
const ReceiptTransctionLines = require("../models/ReceiptTransactionLines");
const now = new Date();
const addReceiptTransaction = async (req, res) => {
  const createTransaction = await dbConn.transaction();

  const { receiptHeader, receiptLines } = req.body;
  const { document_no, transaction_type, amt_paid, account_id, subsidiary_id } =
    receiptHeader;
  receiptHeader.document_date = now;
  const { amt_lines, invoice_account_id } = receiptLines;
  let lines = [];

  try {
    const addReceipt = await ReceiptTransaction.create(receiptHeader, {
      transaction: createTransaction,
    });
    

    for await (const line of receiptLines) {
        // line.receipt_transaction_id = addReceipt.receipt_id
      const acctLine = await getAccountDetails(line.invoice_account_id);
      await ReceiptTransctionLines.create(line, {
        transaction: createTransaction,
      });
      lines.push({
        document_no,
        subsidiary_id,
        account_id: subsidiary_id,
        debit: acctLine.nature_account === "DR" ? line.amt_lines : 0,
        credit: acctLine.nature_account === "CR" ? line.amt_lines : 0,
        explanation: line.explanation,
      });
    }

    // prepare details for posting
    const account = await getAccountDetails(account_id);

    const transactionDetails = {
      header: {
        document_no,
        posted_date: now,
        account_id,
        explanation: receiptHeader.explanation,
        debit: account.nature_account === "DR" ? amt_paid : 0,
        credit: account.nature_account === "CR" ? amt_paid : 0,
      },
      lines: [...lines],
    };
    console.log("transactionDetails:", transactionDetails);

    // post entries
    // await postTransactions({ transactionDetails });

    // await createTransaction.commit();

    res.status(200).json(addReceipt);
  } catch (error) {
    res.json(error);
    console.log("ERROR:", error);
    await createTransaction.rollback();
  }
};

module.exports = { addReceiptTransaction };
