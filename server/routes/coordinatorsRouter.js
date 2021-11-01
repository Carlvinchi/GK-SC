// Router  for Coordinators

const express = require('express')

const router = express.Router()

const authenticator = require('../middleware/auth')

const {addCoordinator,updateCoordinator,
deleteCoordinator,getCoordinator,
getCoordinators,deleteManyCoordinator} = require('../controllers/coordinators')

router.post('/add', authenticator,addCoordinator)

router.get('/',authenticator,getCoordinators)
router.delete('/',authenticator,deleteManyCoordinator)

router.route('/:id').get(authenticator,getCoordinator)
.patch(authenticator,updateCoordinator)
.delete(authenticator,deleteCoordinator)


module.exports = router

