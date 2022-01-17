const mongoose = require('mongoose');
const customerSchema=new mongoose.Schema({
    fname:{type:String},
    lname:{type:String},
    email:{type:String,unique:true},
    password:{type:String},
    address:{type:Array},
    contact:{type:String},
    cart:{type:Array},
    profile_photo:{type:String},
    provider:{type:String}
    // gender:{type:String}
},
{timestamps:true}
)
module.exports=mongoose.model("customers",customerSchema)