
import { errorHandler } from "./error.js"
import jwt from "jsonwebtoken"




export const verifyToken = (req,res,next) => {

   const {token} = req.headers

   if(!token)
   {
    return next(errorHandler(403 , "There is not token"))
   }

   jwt.verify(token , process.env.JWT_SECRETE ,(err ,user) => {

        if(err)
        {
            return next(errorHandler(401,"Token do not match or the token expired"))
        }

        req.user = user

        next()

   })
   

}


export const generateRandomNumber = () => {

    const letters = "ABCDEFGHIJLMNOPQRSTUVWXWZ"

    const randomLetter = letters[Math.floor(Math.random() * letters.length)]

    const randomNumbers = Math.floor(Math.random() * 900)

    return `${randomLetter}${randomNumbers}`
    
}