import express from 'express'
import { deleteUserById, getAllUsers, getUserById, updateUserById } from '../controllers/user-controller.js'
import { verifyToken } from '../middleware/auth-middleware.js'

export const userRouter = express.Router()

userRouter.get('/:id', verifyToken, getUserById)
userRouter.get('/', getAllUsers)
userRouter.put('/:id', updateUserById)
userRouter.delete('/:id', deleteUserById)