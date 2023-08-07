const router = require('express').Router()
const ClassController = require('../controllers/classController')

router.get('/', ClassController.getClass)
router.get('/detail/:ClassId', ClassController.getById)


module.exports = router