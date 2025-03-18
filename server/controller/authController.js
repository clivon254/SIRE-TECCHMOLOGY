
import User from "../model/userModel.js"
import { errorHandler } from "../utils/error.js"
import validator from "validator"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"



export const signUp = async (req,res,next) => {

    try
    {
        const {username,password,email,cvUrl} = req.body

        if(!email || !username || !password || !cvUrl || username === "" || password === "" || email === "" || cvUrl === "")
        {
            return next(errorHandler(400, "please fill all the fields"))
        }

        if(!validator.isEmail(email))
        {
            return next(errorHandler(400, "Please provide a valid email"))
        }

        const existingEmail = await User.findOne({email})

        if(existingEmail)
        {
            return next(errorHandler(400, "Email is already registered"))
        }

        const hashedPassword = bcryptjs.hashSync(password , 10)

        const newUser = new User({
            email,
            password:hashedPassword,
            username,
            cvUrl
        })

        await newUser.save()

        res.status(200).json({success:true , message:"User created successfully"})

    }
    catch(error)
    {
        next(error)
    }

}


export const signIn = async (req,res,next) => {

    const {email,password} = req.body

    if(!email || !password || password === "" || email === "")
    {
        return next(errorHandler(400, "please fill up all the fields"))
    }

    if(!validator.isEmail(email))
    {
        return next(errorHandler(400 , "Please provide a valid email"))
    }

    try
    {

        const user = await User.findOne({email})

        if(!user)
        {
            return next(errorHandler(404,"User not found"))
        }

        const isMatch = await bcryptjs.compare(password , user.password)
    
        if(!isMatch)
        {
            return next(errorHandler(401,"The password is incorrect"))
        }

        const token = jwt.sign(
            {
                id:user._id,
                isAdmin:user.isAdmin,
            },
            process.env.JWT_SECRETE,
            {expiresIn:"12h"}
        )

        const {password:pass , ...rest} = user._doc

        res.status(200).json({success:true , rest , token})

    }
    catch(error)
    {
        next(error)
    }

}


export const forgotPassword = async (req,res,next) => {

    const {email} = req.body

    if(!email || email === "")
    {
        return next(errorHandler(400 ,"please provide an email"))
    }

    if(!validator.isEmail(email))
    {
        return next(errorHandler(400 ,"Invalid email"))
    }

    try
    {
        const user = await User.findOne({email})

        if(!user)
        {
            return next(errorHandler(404, "email provided not registered"))
        }

        const token = jwt.sign(
            {
                id:user._id,
            },
            process.env.JWT_SECRETE,
            {expiresIn:'1h'}
        )

        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.AUTH_USER,
                pass:process.env.AUTH_PASS
            }
        })

        var mailOptions = {
            from:"SIRE TECH SOLUTIONS",
            to:user.email,
            subject:"Reset Password",
            text:`Click on these link to reset your passord: http://localhost:5173/reset-password/${token}`
        }

        transporter.sendMail(mailOptions ,(error,info) => {

            if(error)
            {
                console.log(error)
            }
            else
            {
                console.log('Email sent' + info.response)
            }

        })

        res.status(200).json({success:true ,message:'Link has been sent to your email'})

    }
    catch(error)
    {
        next(error)
    }

}


export const resetPassword = async (req,res,next) => {

    const {token} = req.params

    const {password ,confirmPassword} = req.body

    if(!password || !confirmPassword || password === "" || confirmPassword === "")
    {
        return next(errorHandler(400 ,"Please fill all the feilds"))
    }

    try
    {
        const decodedToken = jwt.verify(token , process.env.JWT_SECRETE)

        const user = await User.findById(decodedToken.id)

        if(!user)
        {
            return next(errorHandler(400,"user not found"))
        }

        if(password !== confirmPassword)
        {
            return next(errorHandler(400,"The passwords do not match"))
        }

        const hashedPassword = bcryptjs.hashSync(password , 10)
        
        user.password = hashedPassword

        await user.save()

        res.status(200).json({success:true ,message:"password reset successfully"})

    }
    catch(error)
    {
        next(error)
    }

}


export const contactUs = async (req,res,next) => {

    try
    {}
    catch(error)
    {
        next(error)
    }

}