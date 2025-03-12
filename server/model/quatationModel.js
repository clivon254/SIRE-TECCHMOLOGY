
import mongoose from "mongoose"


const quatationSchema = new mongoose.Schema(
    {
        number:{type:String , required:true},

        client:{type:mongoose.Schema.Types.ObjectId , ref:'Client'},

        validUnitil:{type:Date , required:true},

        description:{type:Date , required:true},

        items:{type }
    },
    {
        timestamps:true
    }
)

const Quatation = mongoose.model('Quatation', quatationSchema)


export default Quatation