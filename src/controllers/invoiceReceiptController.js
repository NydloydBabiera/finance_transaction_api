const dbConn = require("../data-access/dbConn");
const InvoiceReceipt = require("../models/InvoiceReceipt");

const createNewInvoice = async (req, res) => {
  const createInv = await dbConn.transaction();
  const invoiceDetails = req.body;

  try {
    const newInvoice = await InvoiceReceipt.create(invoiceDetails, {
      transaction: createInv,
    });
    await createInv.commit();

    res.status(200).json(newInvoice);
  } catch (error) {
    res.json(error);
    console.log("ERROR:", error);
    await createInv.rollback();
  }
};

const getAllInvoice = async (req, res) => {
  await InvoiceReceipt.findAll()
    .then((invoice) => res.json(invoice))
    .catch((error) => {
      res.json(error);
      console.log(error);
    });
};

module.exports = { createNewInvoice, getAllInvoice };
