
const orderModel=require('../Models/OrderSchema');

const orderControls ={

    //function for chekout button
    checkOut : (req,res)=>{
        console.log("......................",req.body,"..........")
        let data={
         cart:req.body.cartItem,
         email: req.body.email,
         cardnumber:req.body.cardnumber,
         gst : req.body.gst,
         total : req.body.total,
         subtotal : req.body.subtotal,
         address : req.body.selected
        };

        let ins=new orderModel(data);
        ins.save((err)=>{
            if(err){
                res.json({"err":"Please select address and enter card details"})
            }
            else{
                res.json({"msg":'Order Placed Successfully'})
            }
        })
    },

    //function for fetching order details mai email as params
    getOrderDetails : (req,res)=>{
        console.log("params email : ", req.params.email)
        orderModel.find({email: req.params.email},(err,data)=>{
            if(err){
                res.json({err:"cant fetch order details"})
            }
            else{
                res.json(data)
            }
        })
    },

    // Function for generating invoice by order id
    getInvoice : (req,res)=>{
        console.log(req.params.id)
        orderModel.findById(req.params.id,(err,data)=>{
            if(err){
                res.json({"msg":"Cant get invoice details"})
            }
            else{
                res.json(data);
            }
        })
    }
}

module.exports = orderControls