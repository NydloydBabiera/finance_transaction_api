const router = require('express').Router()
const controller = require('../controllers/generalLedgeController')

router.post('/postGlTransactions', controller.postGLTransaction)
router.get('/getAllGLtransactions', controller.getAllGLtransactions)

module.exports = router