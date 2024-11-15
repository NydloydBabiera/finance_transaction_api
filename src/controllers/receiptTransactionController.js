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
  let lines = [];

  try {
    const addReceipt = await ReceiptTransaction.create(receiptHeader, {
      transaction: createTransaction,
    });


    for await (const line of receiptLines) {
      const acctLine = await getAccountDetails(line.invoice_account_id);
      await ReceiptTransctionLines.create(line, {
        transaction: createTransaction,
      });
      
      lines.push({
        document_no,
        subsidiary_id,
        account_id: line.invoice_account_id,
        debit: acctLine.nature_account === "DR" ? line.amt_lines : 0,
        credit: acctLine.nature_account === "CR" ? line.amt_lines : 0,
        explanation: line.explanation,
      });
    }

    // prepare details for posting A/R start
    const invAccount = await getAccountDetails(account_id);

    const ARtransactionDetails = {
      header: {
        document_no,
        posted_date: now,
        account_id,
        explanation: receiptHeader.explanation,
        debit: invAccount.nature_account === "DR" ? amt_paid : 0,
        credit: invAccount.nature_account === "CR" ? amt_paid : 0,
      },
      lines: [...lines],
    };

    await postTransactions(ARtransactionDetails);
    // post A/R entries end here
 
    //post CASH entries start
    const cashAcct = await getAccountDetails(1);
    const cashTransactionDetails = {
      header: {
        document_no,
        posted_date: now,
        account_id: 1,
        explanation: receiptHeader.explanation,
        debit: cashAcct.nature_account === "DR" ? amt_paid : 0,
        credit: cashAcct.nature_account === "CR" ? amt_paid : 0,
      },
      lines: [],
    };
    await postTransactions(cashTransactionDetails);

    // post CASH entries end

    await createTransaction.commit();

    res.status(200).json(addReceipt);
  } catch (error) {
    res.json(error);
    console.log("ERROR:", error);
    await createTransaction.rollback();
  }
};

module.exports = { addReceiptTransaction };
