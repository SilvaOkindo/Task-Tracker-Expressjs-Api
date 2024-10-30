import express from 'express'
import { checkSchema } from 'express-validator'
import { userCreateValidationSchema } from '../utils/user-create-validation-schema.js'
import { checkAuth, loginUser, registerUser } from '../controllers/auth-controller.js'
import { userLoginValidationSchema } from '../utils/user-login-validation-schema.js'
import { verifyToken } from '../middleware/auth-middleware.js'

export const authRouter = express.Router()

authRouter.post('/', checkSchema(userCreateValidationSchema), registerUser)
authRouter.post('/login', checkSchema(userLoginValidationSchema), loginUser)
authRouter.get('/check-auth', verifyToken, checkAuth)