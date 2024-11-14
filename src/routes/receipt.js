const router = require('express').Router()
const controller = require('../controllers/receiptTransactionController')

router.post('/addReceiptTransaction', controller.addReceiptTransaction)
// router.get('/getAllInvoices', controller.getAllInvoice)

module.exports = router