// Router  for Modules

const express = require('express')

const router = express.Router()


const {addModule,updateModule,deleteModule,
    getModule,getModules, deleteManyModule} = require('../controllers/modules')

const authenticator = require('../middleware/auth')

router.post('/add',authenticator,addModule)

router.get('/course/:courseId',authenticator,getModules)

router.delete('/course',authenticator,deleteManyModule)

router.route('/:id').get(authenticator,getModule)
.patch(authenticator,updateModule)
.delete(authenticator,deleteModule)


module.exports = router