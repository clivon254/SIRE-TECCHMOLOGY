
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import "dotenv/config"
import authRouter from "./router/authRouter.js"
import userRouter from "./router/userRouter.js"
import clientRouter from "./router/clientRouter.js"
import projectRouter from "./router/projectRouter.js"
import quatationRouter from "./router/quatationRouter.js"




const app = express()

const PORT  = process.env.PORT


app.use(cors())


app.use(express.json())



// DB CONNECTION
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB CONNECTED"))
.catch((err) => console.log(err))




// ROUTERS
app.use('/api/auth', authRouter)


app.use('/api/user', userRouter)


app.use('/api/client', clientRouter)


app.use('/api/project', projectRouter)


app.use('/api/quatation', quatationRouter)





// API
app.get('/', (req,res) => {

    res.send("HELLO SIRE TECH SOLUTIONS")

})



// API LISTENING
app.listen(PORT ,(err) => {

    if(!err)
    {
        console.log(`Server running on port ${PORT}`)
    }
    else
    {
        console.log(err)
    }

})



app.use((err,req,res,next) => {

    const statusCode = err.statusCode || 500

    const message = err.message || "Internal Server Error"

    res.status(statusCode).json({success:false , message:message})

})