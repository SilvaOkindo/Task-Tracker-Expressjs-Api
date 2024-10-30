import express from 'express'
import { addTask, changeTaskPriority, changeTaskStatus, deleteTask, editTask, getTask, getTasks, getTasksByPriority, getTasksByStatus } from '../controllers/task-controller.js'
import {verifyToken} from '../middleware/auth-middleware.js'
import { checkSchema } from 'express-validator'
import { createTaskValidationSchema } from '../utils/create-task-validation-schema.js'

export const taskRouter = express.Router()

taskRouter.get('/', verifyToken, getTasks)
taskRouter.get('/:id', verifyToken, getTask)
taskRouter.get('/by-status/:status', verifyToken, getTasksByStatus)
taskRouter.get('/by-priority/:priority', verifyToken, getTasksByPriority)
taskRouter.post('/', checkSchema(createTaskValidationSchema), verifyToken, addTask)
taskRouter.put('/:id', verifyToken, editTask)
taskRouter.patch('/change-status/:id', verifyToken, changeTaskStatus)
taskRouter.patch('/change-priority/:id', verifyToken, changeTaskPriority)
taskRouter.delete('/:id', verifyToken, deleteTask)
