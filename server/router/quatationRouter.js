

import express from "express"
import { verifyToken } from "../utils/verify.js"
import { deleteQuatation, generateQuatation, getQuatation, getQuatations, updateQuatation } from "../controller/quatationController.js"


const quatationRouter = express.Router()


quatationRouter.post('/generate-quatation', verifyToken, generateQuatation)


quatationRouter.get('/get-quatation/:quatationId', getQuatation)


quatationRouter.get('/get-quatations', verifyToken , getQuatations)


quatationRouter.put('/update-quatation/:quatationId', verifyToken , updateQuatation)


quatationRouter.delete('/delete-quatation/:quatationId', verifyToken , deleteQuatation)



export default quatationRouter