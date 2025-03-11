

import express from "express"
import { forgotPassword, resetPassword, signIn, signUp } from "../controller/authController.js"


const authRouter = express.Router()


authRouter.post('/sign-up', signUp)


authRouter.post('/sign-in', signIn)


authRouter.post('/forgot-password', forgotPassword)


authRouter.post('/reset-password/:token', resetPassword)




export default authRouter