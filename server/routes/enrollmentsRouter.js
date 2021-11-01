// Router  for Enrollments

const express = require('express')

const router = express.Router()

const authenticator = require('../middleware/auth')

const {addEnrollment,
    updateEnrollment,
    deleteEnrollment,
    getEnrollment,
    getEnrollments,
deleteManyEnrollment,
updateEnrollmentScore} = require('../controllers/enrollments')

router.post('/add', authenticator,addEnrollment)

router.patch('/score',authenticator,updateEnrollmentScore)

router.get('/',authenticator,getEnrollments)

router.delete('/',authenticator,deleteManyEnrollment)

router.route('/:id').get(authenticator,getEnrollment)
.patch(authenticator,updateEnrollment)
.delete(authenticator,deleteEnrollment)


module.exports = router

