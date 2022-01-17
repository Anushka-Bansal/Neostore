const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
    email :{type:String,required:true},
    address: {type:Object,required:true},
    cart: {type:Array,required:true},
    cardnumber: {type:String,required:true},
    subtotal :{type:Number,required:true},
    total :{type:Number,required:true},
    gst :{type:Number,required:true}
},
{timestamps:true})

module.exports=mongoose.model('orders',orderSchema);