
import express from "express"
import { verifyToken } from "../utils/verify.js"
import { addClient, deleteClient, getClient, getClients, updateClient } from "../controller/clientController.js"



const clientRouter = express.Router()



clientRouter.post('/add-client', verifyToken ,addClient)


clientRouter.get('/get-client/:clientId', getClient)


clientRouter.get('/get-clients',verifyToken , getClients)


clientRouter.put('/update-client/:clientId', verifyToken , updateClient)


clientRouter.delete('/delete-client/:clientId', verifyToken , deleteClient)





export default clientRouter