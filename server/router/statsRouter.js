

import express from "express"
import { verifyToken } from "../utils/verify.js"
import { stat } from "../controller/statsController.js"


const statRouter = express.Router()


statRouter.get('/get-stat', verifyToken, stat)


export default statRouter