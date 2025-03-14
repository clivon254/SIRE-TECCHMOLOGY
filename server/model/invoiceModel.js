

import mongoose from "mongoose"


const invoiceSchema = new mongoose.Schema({

    invoiceNumber: { type: String, required: true },

    project:{type:mongoose.Schema.Types.ObjectId ,ref:'Project'},

    reference:{type:mongoose.Schema.Types.ObjectId ,ref:'Quatation'},

    client:{type:mongoose.Schema.Types.ObjectId ,ref:'Client'},

    duePayment:{type:Date , required:true},

    items:{type:Array , required:true},

    description:{type:String , required:true}
},
{
    timestamps: true
})


const Invoice = mongoose.model('Invoice', invoiceSchema)


export default Invoice