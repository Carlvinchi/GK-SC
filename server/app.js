// This is the entry point to the application

const express = require('express')

const connectDB = require('./db/connect')

const app = express()

const notFound = require('./middleware/not-found')

const errHandler = require('./middleware/error-handler')

const usersRoute = require('./routes/usersRouter')

const coursesRoute = require('./routes/coursesRouter')

const modulesRoute = require('./routes/modulesRouter')

const quizRoute = require('./routes/quizRouter')

const coordinatorRoute = require('./routes/coordinatorsRouter')

const enrollmentRoute = require('./routes/enrollmentsRouter')
// middleware
app.use(express.json())

require('dotenv').config()

// users route
app.use('/api/v1/users', usersRoute)

// coursesroute
app.use('/api/v1/courses', coursesRoute)

// modules route
app.use('/api/v1/modules', modulesRoute)

// quizzes route
app.use('/api/v1/quizzes',quizRoute)

// coordinators route
app.use('/api/v1/coordinators',coordinatorRoute)

// enrollments route
app.use('/api/v1/enrollments',enrollmentRoute)

app.use(notFound)

app.use(errHandler)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is running on port ${port}...`))

    } catch (error) {
        console.log(error)
    }
}

start()