const router = require('express').Router()
const UserController = require('../controllers/userController.js')
const userAuthentication = require('../middlewares/userAuthentication.js')

router.get('/', UserController.getUser)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/google-sign-in', UserController.googleLogIn)

router.use(userAuthentication)
router.post('/payment', UserController.payment)
router.post('/add/:ClassId', UserController.addClass)
router.patch('/subscribe', UserController.status)
router.get('/class', UserController.getUserClass)


module.exports = router