const router = require('express').Router()
const MemberController = require('../controllers/memberController.js')

router.get('/', MemberController.getMember)
router.get('/detail/:ClassId', MemberController.getById)


module.exports = router