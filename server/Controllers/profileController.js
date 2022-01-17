const customerModel = require('../Models/CustomerSchema');
const bcrypt = require('bcrypt');

const profileControls ={

    //function to get user details
    getUser : async(req,res)=>{
        console.log(req.params.email)
        const user = await customerModel.findOne({ email :req.params.email })
        console.log(user)
        if(user){
            res.json(user)
        }
    },

    //function to update user
    updateUser : (req,res)=>{
        console.log(req.params.email);
        customerModel.findOneAndUpdate(
            {email : req.params.email},
            { $set : req.body.values},
            (err,data)=>{
                if(err){
                    res.json({"msg":"Something is wrong"})
                }
                else{
                    
                    res.json({"msg":"Details updated successfully","data":data})
                }
            }
        )
    },

    //function to change password
    changePassword : (req,res)=>{
        console.log(req.body)
        console.log("change password",req.params.email);
        customerModel.findOne({email : req.params.email},(err,data)=>{
            if(data){
                console.log(req.body.oldRef)
                console.log(".....old password",data.password)
                const oldpass = req.body.oldRef;
                const isMatch =bcrypt.compareSync(oldpass, data.password);
                console.log("decrypted password",isMatch)
                if(isMatch){
                    const password = req.body.values.password;
                    const hashPassword = bcrypt.hashSync(password, 10)
                    customerModel.updateOne(
                        {email: data.email},
                        {$set: {password : hashPassword}},
                        (err)=>{
                            if(err){
                                res.json({"err":"can't change password"})
                            }
                            else{
                                res.json({"msg":"password changed successfully"})
                            }
                        }
                    )
                } 
                else{
                    res.json({"err":"old password not matched"})
                }   
            }   
        })
    },

    //function to add address
    addAddress : (req,res)=>{
        console.log("Address added" , req.body);
        let addresses ={
            address : req.body.values.address,
            pincode : req.body.values.pincode,
            city : req.body.values.city,
            state : req.body.values.state,
            country : req.body.values.country,
            address_id : Math.random()
        };
        customerModel.findOneAndUpdate(
            {email : req.params.email},
            {$push : {address : addresses} },
            (err,data) =>{
                if(err){
                    res.json({"msg":"Something went wrong"})
                }
                else{
                    res.json({"msg": "address added","data":data})
                }
            }
        )
    },

    //function to edit address
    editAddress : (req,res)=>{
        console.log(req.params.email);
        let addresses ={
            address : req.body.values.address,
            pincode : req.body.values.pincode,
            city : req.body.values.city,
            state : req.body.values.state,
            country : req.body.values.country
        };
        customerModel.findOneAndUpdate(
           {$and : [{email : req.params.email},{address : addresses}]},
            { $set : {address: addresses}},
            (err,data)=>{
                if(err){
                    res.json({"msg":"Something is wrong"})
                }
                else{
                    
                    res.json({"msg":"Address updated successfully","data":data})
                }
            }
        )
    }
}

module.exports = profileControls;