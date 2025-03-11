

import express from "express"
import { deleteUser, getUser, getUsers, updateUser } from "../controller/userController.js"
import { verifyToken } from "../utils/verify.js"


const userRouter = express.Router()



userRouter.get('/get-user/:userId', getUser)


userRouter.get('/get-users', getUsers)


userRouter.get('/update-user/:userId', verifyToken, updateUser)


userRouter.get('/delete-user/:userId', verifyToken , deleteUser)




export default userRouter