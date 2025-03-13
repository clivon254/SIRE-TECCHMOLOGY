
import Quatation from "../model/quatationModel.js"
import { errorHandler } from "../utils/error.js"
import PDFDocument from "pdfkit"
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage"
import { app } from "../utils/firebase.js"
import { generateRandomNumber } from "../utils/verify.js"
import Client from "../model/clientModel.js"


const storage = getStorage(app)


export const generateQuatation = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401,"You are not allowed to generate a quatation"))
    }

    const {client,validUntil,description,items,paymentSchedule,additionalCost,termsAndCondition,warranty} = req.body

    try
    {

        const number = generateRandomNumber()

        const newQuatation = new Quatation({
            number,client,validUntil,description,items,paymentSchedule,additionalCost,termsAndCondition,warranty
        })

        const clientel = await Client.findById(client)

        if(!clientel)
        {
            return next(errorHandler(404,"Client not found"))
        }

        const doc = new PDFDocument()

        const buffers = []

        doc.on('data', buffers.push.bind(buffers))

        // ADD PDF CONTENT

        // logo to top center
        doc.image('../assests/SIRELOGO.png',{
            fit:[150, 200],
            align: 'center',
            valign: 'center'
        })

        doc.moveDown(2)


        // quatation title
        doc.fontSize(20).text('Web development Quotation', {align :'center'})
        

        doc.moveDown()


        // quatation details
        doc.fontSize(14).text(`Quatation Number : QT-${number}`)
        doc.text(`Date : ${new Date().toLocaleDateString()}`)
        doc.text(`To : ${clientel.name || 'N/A' }`)
        doc.text(`Email: ${client.email || 'N/A'}`)
        doc.text(`Phone : ${clientel.phone || `N/A`}`)


        doc.moveDown()

        // description
        doc.fontSize(14).text('Description')


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


        // Additional cost
        doc.text(`${additionalCost}`)

        // payment schedule
        doc.text(`${paymentSchedule}`)

        // warant
        doc.text(`${warranty}`)

        

        // Add some space before the signature section
        doc.moveDown(4);

        // Add signature line
        const signatureX = 100;
        const signatureWidth = 200;
        const signatureY = doc.y;

        // Draw the signature line
        doc.moveTo(signatureX, signatureY)
        .lineTo(signatureX + signatureWidth, signatureY)
        .stroke();

        // Add text under the signature line
        doc.fontSize(10).text('Client Signature', signatureX, signatureY + 5, {
        width: signatureWidth,
        align: 'center'
        });

        // Add date line
        const dateX = 350;
        const dateWidth = 150;

        // Draw the date line
        doc.moveTo(dateX, signatureY)
        .lineTo(dateX + dateWidth, signatureY)
        .stroke();

        // Add text under the date line
        doc.text('Date', dateX, signatureY + 5, {
        width: dateWidth,
        align: 'center'
        });

        // Optional: Add text above signature lines
        doc.fontSize(12).text('I accept this quotation and agree to the terms and conditions.', 100, signatureY - 30, {
        width: 400
        });

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


        newQuatation.url = downloadURL 


        await newQuatation.save()

        res.status(200).json({success:true , newQuatation})

    }
    catch(error)
    {
        next(error)
    }

}


export const getQuatation = async (req,res,next) => {

    const {quatationId} = req.params
    
    try
    {
        const quatation = await Quatation.findById(quatationId)
        
        if(!quatation)
        {
            return next(errorHandler(404,"Quatation not found"))
        }

        res.status(200).json({success:true , quatation})

    }
    catch(error)
    {
        next(error)
    }

}


export const getQuatations = async (req,res,next) => {

    if(!req.user.id)
    {
        return next(errorHandler(401 ,"You are not alloed to access the quatations"))
    } 

    try
    {
        const quatations = await Quatation.find().sort({_id:-1})

        res.status(200).json({success:true , quatations})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateQuatation = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to update quatation"))
    }

    const {quatationId} = req.params

    const quatation = await Quatation.findById(quatationId)

    if(!quatation)
    {
        return next(errorHandler(404,"quatation not found"))
    }

    try
    {

        const updatedQuatation = await Quatation.findByIdAndUpdate(quatationId,
            {
                $set:{
                    number:req.body.number,
                    client:req.body.client,
                    description:req.body.description,
                    items:req.body.items,
                    paymentSchedule:req.body.paymentSchedule,
                    termsAnCondition:req.body.termsAnCondition,
                    warranty:req.body.warranty,
                    additionalCost:req.body.additionalCost,
                    validUntil:req.body.validUntil
                }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedQuatation})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteQuatation = async (req,res,next) => {
    
    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to delete quatation"))
    }
    
    const {quatationId} = req.params

    const quatation = await Quatation.findById(quatationId)

    if(!quatation)
    {
        return next(errorHandler(404,"quatation not found"))
    }

    try
    {
        await Quatation.findByIdAndDelete(quatationId)

        res.status(200).json({success:true , message:"quatation deleted successfully"})

    }
    catch(error)
    {
        next(error)
    }

}