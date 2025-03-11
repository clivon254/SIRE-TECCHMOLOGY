
import bcryptjs from "bcryptjs"
import User from "../model/userModel.js"
import { errorHandler } from "../utils/error.js"



export const getUser = async (req,res,next) => {

    const {userId} = req.params

    try
    {
        const user = await User.findById(userId)

        if(!user)
        {
            return next(errorHandler(404,"user not found"))
        }

        const {password:pass , ...rest} = user._doc 

        res.status(200).json({success:true , rest})

    }
    catch(error)
    {
        next(error)
    }

}


export const getUsers = async (req,res,next) => {

    try
    {
        const users = await User.find()

        const usersWithoutPassword = users.map((user) => {

            const {password , ...rest} = user._doc

            return rest

        })

        res.status(200).json({success:true , usersWithoutPassword})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateUser = async (req,res,next) => {

    if(!req.user.id && req.user.isAdmin)
    {
        return next(errorHandler(401,"You are not allowed to updated the profile"))
    }

    const {userId} = req.params

    const user = await User.findById(userId)

    if(!user)
    {
        return next(errorHandler(404,"User not found"))
    }

    try
    {

        if(req.body.password)
        {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }

        const updatedUser = await User.findByIdAndUpdate(userId,
            {
                $set:{
                    email:req.body.email,
                    username:req.body.username,
                    profilePicture:req.body.profilePicture,
                    cvUrl:req.body.cvUrl,
                }
            },
            {new:true}
        )

        const {password , ...rest} = updatedUser._doc

        res.status(200).json({success:true , rest})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteUser = async (req,res,next) => {

    if(!req.user.id && req.user.isAdmin)
    {
        return next(errorHandler(401,"You are not allowed to updated the profile"))
    }

    const {userId} = req.params

    const user = await User.findById(userId)

    if(!user)
    {
        return next(errorHandler(404,"User not found"))
    }

    try
    {
        await User.findByIdAndDelete(userId)

        res.status(200).json({success:true , message:`${user.username} is deleted successfully`})

    }
    catch(error)
    {
        next(error)
    }

}