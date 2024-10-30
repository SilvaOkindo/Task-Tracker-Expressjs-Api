import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/connect-db.js'
import { authRouter } from './routes/auth-routes.js'
import { userRouter } from './routes/user-routes.js'
import { taskRouter } from './routes/task-routes.js'
dotenv.config()

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json({message: "Task tracker api. Welcome"})
})

// database connection
connectDB()

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/tasks', taskRouter)

const PORT = process.env.PORT || 3003

app.listen(PORT, () => {
    console.log("App running on port", PORT)
})

