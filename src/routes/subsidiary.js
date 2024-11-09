const router = require('express').Router()
const controller = require('../controllers/subsidiaryAccountController')

router.post('/addNewSubsidiary', controller.addNewSubsidiary)
router.get('/getAllSubsidiary', controller.getAllSubsidiary)

module.exports = router