
import mongoose from "mongoose"


const quatationSchema = new mongoose.Schema(
    {
        number:{type:String , required:true},

        client:{type:mongoose.Schema.Types.ObjectId , ref:'Client'},

        validUntil:{type:Date , required:true},

        description:{type:String, required:true},

        items:{type:Array, required:true },

        paymentSchedule:{type:String , required:true},

        additionalCost:{type:String ,required:true },

        termsAndCondition:{type:String , required:true},

        warranty:{type:String ,required:true},

        url:{type:String , required:true}
    },
    {
        timestamps:true
    }
)

const Quatation = mongoose.model('Quatation', quatationSchema)


export default Quatation