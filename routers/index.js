const router = require('express').Router()
const trainerRouter = require('./trainerRouter')
const categoryRouter = require('./categoryRouter')
const classRouter = require('./classRouter')
const scheduleRouter = require('./scheduleRouter')
const memberRouter = require('./memberRouter')
const userRouter = require('./userRouter')


router.use('/trainers', trainerRouter)
router.use('/categories', categoryRouter)
router.use('/classes', classRouter)
router.use('/schedules', scheduleRouter)
router.use('/members', memberRouter)
router.use('/users', userRouter)

module.exports = router