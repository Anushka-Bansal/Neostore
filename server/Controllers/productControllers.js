const productModel = require("../Models/ProductsSchema")
const colorModel = require("../Models/ColorSchema");
const categoryModel = require("../Models/CategorySchema");
const customerModel = require("../Models/CustomerSchema")

const productControls = {

    // Function for adding new products
    addProduct : (req,res)=>{
        let ins = new productModel(req.body);
        console.log(ins)
        ins.save((err)=>{
            if(err){
                res.json({err:"Error!"})
            }
            else{
                res.json({msg:"Product added"})
            }
        })
    },

    // Function to fetch products
    getProduct : (req,res)=>{
        productModel.find({},(err,data)=>{
            if(err) {
                res.json({err:"something went wrong"})
            }
            else{
                res.send(data)
            }
        })
    },

    //Function for fetching product details 
    getProductDetails : (req,res)=>{
        console.log("params id : ", req.params.id)
        productModel.findById(req.params.id,(err,data)=>{
            if(err){
                res.json({err:"cant fetch product details"})
            }
            else{
                res.send(data)
            }
        })
    },

    //Function to add color
    addColor : (req,res)=>{
        let ins = new colorModel(req.body);
        console.log(ins)
        ins.save((err)=>{
            if(err){
                res.json({err:"Error!"})
            }
            else{
                res.json({msg:"Color added"})
            }
        })
    },

    //Function to fetch color by id (displaued in product details page(color:product color))
    getColor : (req,res)=>{
        console.log("params id : ", req.params.id)
        colorModel.findById(req.params.id,(err,data)=>{
            if(err){
                res.json({err:"cant fetch colors"})
            }
            else{
                res.send(data)
            }
        })
    },

    //Function to fetch all colors(for dropdown)
    getAllColor : (req,res) =>{
        colorModel.find({},(err,data)=>{
            if(err){
                res.json({err:"can't get all colors "})
            }
            else{
                res.send(data)
            }
        })
    },

    //Function to add categories
    addCategory : (req,res)=>{
        let ins = new categoryModel(req.body);
        console.log(ins)
        ins.save((err)=>{
            if(err){
                res.json({err:"Error!"})
            }
            else{
                res.json({msg:"Category added"})
            }
        })
    },

    //Function to get all category (For dropdown)
    getAllCategory : (req,res)=>{
        categoryModel.find({},(err,data)=>{
            if(err){
                res.json({err:"can't get all categories"})
            }
            else{
                res.send(data)
            }
        })
    },

    //Function to add items in cart
    myCart : (req,res)=>{
        console.log("Cart added" , req.body);
        customerModel.findOneAndUpdate(
            {email : req.params.email},
            {$set : {cart : req.body.items} },
            (err,data) =>{
                if(err){
                    res.json({"msg":"Something went wrong"})
                }
                else{
                    res.json({"msg": "Cart items added","data":data})
                }
            }
        )
    },

}

module.exports = productControls