
import Client from "../model/clientModel.js"
import { errorHandler } from "../utils/error.js"




export const addClient = async (req,res,next) => {

    const  {name,email,phone,additional,whatsapp} = req.body

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401,"You are not allowed add client"))
    }

    try
    {

        const existingClient = await Client.findOne({email})

        if(existingClient)
        {
            return next(errorHandler(400,"The client already exists"))
        }

        const newClient = new Client({
            name,email,phone,additional,whatsapp
        })

        await newClient.save()

        res.status(200).json({success:true , newClient})

    }
    catch(error)
    {
        next(error)
    }

}


export const getClient = async (req,res,next) => {

    const {clientId} = req.params 

    try
    {

        const client = await Client.findById(clientId)

        if(!client)
        {
            return next(errorHandler(404, "client not found"))
        }

        res.status(200).json({success:true , client})

    }
    catch(error)
    {
        next(error)
    }

}


export const getClients = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401,"You are not allowed to access the clients"))
    }

    try
    {
        const clients = await Client.find().sort({_id:-1})

        res.status(200).json({success:true , clients})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateClient = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401,"You are not allowed to update the clients"))
    }

    const {clientId} = req.params

    const client = await Client.findById(clientId)

    if(!client)
    {
        return next(errorHandler(404,"client not found"))
    }

    try
    {

        const updatedClient = await Client.findByIdAndUpdate(
            clientId ,
            {
                $set:{
                    name:req.body.name ,
                    email:req.body.email ,
                    phone:req.body.phone ,
                    whatsapp:req.body.whatsapp ,
                    additional:req.body.additional 
                }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedClient})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteClient = async (req,res,next) => {
    
    if(!req.user.isAdmin) 
    {
        return next(errorHandler(401,"You are not allowed to update the clients"))
    }

    const {clientId} = req.params

    const client = await Client.findById(clientId)

    if(!client)
    {
        return next(errorHandler(404,"client not found"))
    }

    try
    {

        await Client.findByIdAndDelete(clientId)

        res.status(200).json({success:true , message:`${client.name} is deleted successfully`})

    }
    catch(error)
    {
        next(error)
    }

}

