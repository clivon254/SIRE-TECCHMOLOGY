
import express from "express"
import { deleteInvoice, generateInvoice, getInvoice, getInvoices, updateInvoice } from "../controller/invoiceController.js"
import { verifyToken } from "../utils/verify.js"


const invoiceRouter = express.Router()


invoiceRouter.post('/generate-invoice',verifyToken, generateInvoice)


invoiceRouter.get('/get-invoice/:invoiceId', getInvoice)


invoiceRouter.get('/get-invoices', verifyToken, getInvoices)


invoiceRouter.put('/update-invoice/:invoiceId',verifyToken , updateInvoice)


invoiceRouter.delete('/delete-invoice/:invoiceId',verifyToken , deleteInvoice)




export default invoiceRouter