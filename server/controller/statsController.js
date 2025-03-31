
import Client from "../model/clientModel.js"
import Invoice from "../model/invoiceModel.js"
import Project from "../model/projectModel.js"
import Quatation from "../model/quatationModel.js"
import { errorHandler } from "../utils/error.js"


export const stat = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are allowed to access the stats"))
    }

    const {query} = req.query

    const numofDays = Number(query) || 28

    const currentDate = new Date()

    const startDate = new Date()

    startDate.setDate(currentDate.getDate() - numofDays)


    try
    {

        const  totalClients = await Client.find({
            createdAt:{$gte:startDate , $lte: currentDate}
        }).countDocuments()


        const  totalProjects = await Project.find({
            createdAt:{$gte:startDate , $lte: currentDate}
        }).countDocuments()


        const  totalQuatations = await Quatation.find({
            createdAt:{$gte:startDate , $lte: currentDate}
        }).countDocuments()


        const  totalInvoices = await Invoice.find({
            createdAt:{$gte:startDate , $lte: currentDate}
        }).countDocuments()


        const last5Clients = await Client.find()
                                    .limit(5)
                                    .sort({_id:-1})

        const last5Projects = await Project.find()
                                        .limit(5)
                                        .sort({_id:-1})
        

        const last5Invoices = await Invoice.find()
                                    .limit(5)
                                    .sort({_id:-1})


        const last5Quatations = await Quatation.find()
                                        .limit(5)
                                        .sort({_id:-1})

        
        res.status(200).json({
            success:true , 
            totalClients,
            totalInvoices,
            totalProjects,
            totalQuatations ,
            last5Clients,
            last5Projects,
            last5Invoices,
            last5Quatations
        })

    }
    catch(error)
    {
        next(error)
    }

}