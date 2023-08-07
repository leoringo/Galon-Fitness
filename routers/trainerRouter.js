const router = require('express').Router()
const TrainerController = require('../controllers/trainerController')

router.get('/', TrainerController.getTrainer)
router.get('/detail/:TrainerId', TrainerController.getById)

module.exports = router