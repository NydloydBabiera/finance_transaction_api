const router = require('express').Router()
const controller = require('../controllers/invoiceReceiptController')

router.post('/createInvoice', controller.createNewInvoice)
router.get('/getAllInvoices', controller.getAllInvoice)

module.exports = router