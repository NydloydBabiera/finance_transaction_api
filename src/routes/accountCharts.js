const router = require('express').Router()
const controller = require('../controllers/accountChartsController')

router.post('/addNewAccount', controller.addNewAccount)
router.get('/getAllAccounts', controller.getAllAccounts)

module.exports = router