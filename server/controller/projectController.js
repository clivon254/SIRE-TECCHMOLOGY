
import Project from "../model/projectModel.js"
import { errorHandler } from "../utils/error.js"



export const addProject = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(400,"You are not allowed to add Project"))
    }

    const {title,description,client,url,startDate,dueDate,tools} = req.body

    try
    {

        const newProject = new Project({
          title,description,client,url,startDate,dueDate,tools
        })

        newProject.save()

        res.status(200).json({success:true , newProject})

    }
    catch(error)
    {
        next(error)
    }

}


export const getProject = async (req,res,next) => {

    const {projectId} = req.body

    try
    {
        const project = await Project.findById(projectId)

        if(!project)
        {
            return next(errorHandler(404, "Project not found"))
        }

        res.status(200).json({success:true , project})

    }
    catch(error)
    {
        next(error)
    }

}


export const getProjects = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(404,"You are not allowed to access all the projects"))
    }

    try
    {
        const projects = await Project.find()
                                      .sort({_id:-1})
                                      .populate({path:"client"})

        res.status(200).json({success:true , projects})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateProjects = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401,"You are not allowed update the peoject"))
    }

    const {projectId} = req.params 

    const project = await Project.findById(projectId)

    if(!project)
    {
        return next(errorHandler(404,"project not found"))
    }

    try
    {
            
        const updatedProject = await Project.findByIdAndUpdate(
            projectId,
            {
                $set:{
                    title:req.body.title ,
                    description:req.body.description ,
                    client:req.body.client ,
                    url:req.body.url ,
                    startDate:req.body.startDate ,
                    dueDate:req.body.dueDate ,
                    tools:req.body.tools 
                }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedProject})

    }
    catch(error)
    {
        next(error)
    }

}



export const deleteProjects = async (req,res,next) => {
    
    if(!req.user.isAdmin)
    {
        return next(errorHandler(401,"You are not allowed to delete the peoject"))
    }

    const {projectId} = req.params 

    const project = await Project.findById(projectId)

    if(!project)
    {
        return next(errorHandler(404,"project not found"))
    }

    try
    {
        await Project.findByIdAndDelete(projectId)

        res.status(200).json({success:true , message:`${project.title} is deleted successfully`})
        
    }
    catch(error)
    {
        next(error)
    }

}