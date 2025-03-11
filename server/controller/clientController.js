import { errorHandler } from "../utils/error"


export const addClient = async (req,res,next) => {

    const  {name,email,phone,additional,whatsapp} = req.body

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401,"You are not ad"))
    }

    try
    {}
    catch(error)
    {
        next(error)
    }

}


export const getClient = async (req,res,next) => {

    try
    {}
    catch(error)
    {
        next(error)
    }

}


export const getClients = async (req,res,next) => {

    try
    {}
    catch(error)
    {
        next(error)
    }

}


export const updateClient = async (req,res,next) => {

    try
    {}
    catch(error)
    {
        next(error)
    }

}


export const deleteClient = async (req,res,next) => {

    try
    {}
    catch(error)
    {
        next(error)
    }

}

