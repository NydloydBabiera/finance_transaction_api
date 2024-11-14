const dbConn = require("../data-access/dbConn");
const {
  GeneralLedgerTransactions,
  GeneralLedgerTransactionLines,
} = require("../models");
async function postTransactions({ transactionDetails }) {
  const createEntry = await dbConn.transaction();
  const { header, lines } = transactionDetails;
  try {
    //post to gl header
    const glHeader = await GeneralLedgerTransactions.create(header, {
      transaction: createEntry,
    });

    // post to gl lines for payment breakdown
    for await (const line of lines) {
      line.gl_transaction_id = glHeader.gl_transaction_id;
      await GeneralLedgerTransactionLines.create(line, {
        transaction: createEntry,
      });
    }
    await createEntry.commit();
    return { glHeader };
  } catch (error) {
    console.log(error);
    await createEntry.rollback();
  }
}

module.exports = { postTransactions };
