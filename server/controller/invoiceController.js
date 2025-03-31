
import Client from "../model/clientModel.js"
import Invoice from "../model/invoiceModel.js"
import Project from "../model/projectModel.js"
import Quatation from "../model/quatationModel.js"
import { errorHandler } from "../utils/error.js"
import { generateRandomNumber } from "../utils/verify.js"
import PDFDocument from "pdfkit"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { app } from "../utils/firebase.js"



const storage = getStorage(app)


export const generateInvoice = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401,"You are not allowed generate invoice"))
    }

    const {project,client,reference,items,duePayment,description} = req.body

    try
    {
        const invoiceNumber = generateRandomNumber()

        const newInvoice = new Invoice({
            project,client,reference,items,duePayment,description,invoiceNumber
        })

        const projecting = await Project.findById(project)

        if(!projecting)
        {
            return next(errorHandler(404,"Project not found"))
        }

        const clientel = await Client.findById(client)
        
        if(!clientel)
        {
            return next(errorHandler(404,"client not found"))
        }

        const quatation = await Quatation.findById(reference)
        
        if(!quatation)
        {
            return next(errorHandler(404,"Quatation not found"))
        }

        const doc = new PDFDocument()

        const buffers = []

        doc.on('data', buffers.push.bind(buffers))

        // ADD PDF CONTENT
      
 
        doc.moveDown(2)

        // quatation title
        doc.fontSize(20).text('Web development Invoice', {align :'center'})
        

        doc.moveDown()


        // quatation details
        doc.fontSize(14).text(`Invoice Number : IN-${invoiceNumber}`)
        doc.text(`Date : ${new Date().toLocaleDateString()}`)
        doc.text(`To : ${clientel.name || 'N/A' }`)
        doc.text(`Email: ${clientel.email || 'N/A'}`)
        doc.text(`Phone : ${clientel.phone || `N/A`}`)


        doc.moveDown()

        // description
        doc.fontSize(14).text(`${description}`)


        // Items table
        const tableTop = doc.y + 20 
        const itemX = 50 
        const descriptionX = 120 
        const quantityX = 300
        const priceX = 380
        const amountX = 450


        // Add headers
        doc.font('Helvetica-Bold')
        doc.text('Item #', itemX ,tableTop)
        doc.text('Description', descriptionX ,tableTop)
        doc.text('Quantity', quantityX ,tableTop)
        doc.text('Price', priceX ,tableTop)
        doc.text('Amount', amountX ,tableTop)


        // Draw header underline
        doc.moveTo(50, tableTop + 20)
            .lineTo(550, tableTop + 20)
            .stroke()

        
        // Reset
        doc.font('Helvetica')


        // current y position
        let y = tableTop + 30


        // Add items
        items.forEach(item => {

            // calculate line item amount
            const amount = item.quantity * item.price

            doc.text(item.id , itemX, y)
            doc.text(item.description , descriptionX, y)
            doc.text(item.quantity.toString() , quantityX, y)
            doc.text(`$${item.price.toFixed(2)}`, priceX, y);
            doc.text(`$${amount.toFixed(2)}`, amountX, y);

            // Move to next line
            y += 20

        })

        // Draw bottom line
        doc.moveTo(50 ,y)
           .lineTo(550, y)
           .stroke()

        // calculate and display totals
        y += 20

        const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
        const taxRate = 0.10; // 10%
        const tax = subtotal * taxRate;
        const total = subtotal + tax;

        // Right-align the totals
        const totalLabelX = 350;
        const totalValueX = 450;

        doc.text('Subtotal:', totalLabelX, y);
        doc.text(`$${subtotal.toFixed(2)}`, totalValueX, y);
        y += 20;

        doc.text('Tax (10%):', totalLabelX, y);
        doc.text(`$${tax.toFixed(2)}`, totalValueX, y);
        y += 20;

        doc.font('Helvetica-Bold');
        doc.text('Total:', totalLabelX, y);
        doc.text(`$${total.toFixed(2)}`, totalValueX, y);


        // Reset font
        doc.font('Helvetica');

        // Add space after totals
        y += 40;


        doc.text(`Thank you for choosing SIRE Solutions for your web development needs!`,50)

        // After adding all these sections, check if we need a new page before signature
        if (doc.y > 700) {
            doc.addPage();
        }

        doc.end()


        // wait pdf to finish writing
        const pdfData = await new Promise((resolve) => {

            doc.on('end', () => {

                resolve(Buffer.concat(buffers))

            })

        })


        // Upload the PDF to firebase Storage
        const storageRef = ref(storage , `quatation/${number}.pdf`)


        // upload buffer to firebase
        await uploadBytes(storageRef, pdfData ,{
            contentType: 'application/pdf',
        })
       
        const downloadURL = await getDownloadURL(storageRef)

        newInvoice.url = downloadURL

        await newInvoice.save()

        res.status(200).json({success:true ,  newInvoice})

    }
    catch(error)
    {
        next(error)
    }

}


export const getInvoice = async (req,res,next) => {

    const {invoiceId} = req.params

    try
    {
        const invoice = await Invoice.findById(invoiceId)

        if(!invoice)
        {
            return next(errorHandler(404,"invoice not found"))
        }

        res.status(200).json({success:true , invoice})

    }
    catch(error)
    {
        next(error)
    }

}


export const getInvoices = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401,"you are not allowed the invoices"))
    }

    try
    {
        const invoices = await Invoice.find().sort({_id:-1})

        res.status(200).json({success:true , invoices})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateInvoice = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401,"you are not allowed the invoices"))
    }

    const {invoiceId} = req.params

    const invoice = await Invoice.findById(invoiceId)

    if(!invoice)
    {
        return next(errorHandler(404,"invoice not found"))
    }

    try
    {
        const updatedInvoice = await Invoice.findByIdAndUpdate(invoiceId,
        {
            $set:{
                status:req.body.status
            }
        },
        {new:true})
    
        res.status(200).json({success:true , updatedInvoice})

    }
    catch(error)
    {
        next(error)
    }  

}


export const deleteInvoice = async (req,res,next) => {
   
    if(!req.user.isAdmin)
    {
        return next(errorHandler(401,"you are not allowed to delete the invoices"))
    }

    const {invoiceId} = req.params

    const invoice = await Invoice.findById(invoiceId)

    if(!invoice)
    {
        return next(errorHandler(404,"invoice not found"))
    }

    try
    {
        
        await Invoice.findByIdAndDelete(invoiceId)

        res.status(200).json({successs:true , message:"Invoivce deleted successfully"})

    }
    catch(error)
    {
        next(error)
    }

}