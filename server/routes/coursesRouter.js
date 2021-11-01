// Router  for Courses

const express = require('express')

const router = express.Router()

const {addCourse,updateCourse,deleteCourse,
getCourses,getCourse,deleteManyCourse} = require('../controllers/courses')

const authenticator = require('../middleware/auth')

router.post('/add',authenticator,addCourse)

router.get('/',authenticator,getCourses)
router.delete('/',authenticator,deleteManyCourse)

router.route('/:id').get(authenticator,getCourse)
.patch(authenticator,updateCourse)
.delete(authenticator,deleteCourse)


module.exports = router