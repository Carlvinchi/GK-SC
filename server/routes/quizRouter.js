// Router  for Quizzes

const express = require('express')

const router = express.Router()


const {addQuiz,updateQuiz,deleteQuiz,getQuiz,getQuizzes,deleteManyQuiz} = require('../controllers/quiz')

const authenticator = require('../middleware/auth')

router.post('/add',authenticator,addQuiz)

router.get('/course/:courseId',authenticator,getQuizzes)
router.delete('/course',authenticator,deleteManyQuiz)

router.route('/:id').get(authenticator,getQuiz)
.patch(authenticator,updateQuiz)
.delete(authenticator,deleteQuiz)


module.exports = router