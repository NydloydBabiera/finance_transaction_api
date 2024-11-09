const router = require('express').Router()
const controller = require('../controllers/subsidiaryAccountMatchingController')

router.post('/matchSubsAccount', controller.matchSubsidiaryAccount)
router.get('/getAllSubAcctMatching', controller.getAllSubAcctMatching)

module.exports = router