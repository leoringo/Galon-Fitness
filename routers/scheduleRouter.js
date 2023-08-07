const router = require('express').Router()
const ScheduleController = require('../controllers/scheduleController')

router.get('/', ScheduleController.getSchedule)
router.get('/detail/:ScheduleId', ScheduleController.getById)
router.get('/class/:ClassId', ScheduleController.getClassSchedule)

module.exports = router