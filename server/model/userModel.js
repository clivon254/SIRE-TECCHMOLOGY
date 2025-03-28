

import mongoose from "mongoose"


const userSchema = new mongoose.Schema(
    {
        username:{type:String , required:true},

        email:{type:String , required:true},

        password:{type:String , required:true},

        profilePicture:{type:String , default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"},

        isAdmin:{type:Boolean , default:false},

        cvUrl:{type:String , required:true},
    },
    {
        timestamps:true
    })

const User = mongoose.model('User', userSchema)


export default User