const customerModel = require('../Models/CustomerSchema');
const bcrypt = require('bcrypt');
const saltRounds =10;
const {sendmail} = require('../Middleware/MailerMiddleware');

const jwt = require('jsonwebtoken');
const jwtSecret="asdfrtuyxsde4677dff788"

let checkemail;
let checkotpforregister;
let checkotpforpassword;

const customerControls = {

    // function for registration
    register : async (req,res)=>{
        let fname=req.body.fname;
        let lname = req.body.lname;
        let email=req.body.email;
        let password=req.body.password;
        let contact=req.body.contact;
        const passwordHash =await bcrypt.hash(password,10)
        
        let ins=new customerModel({fname:fname,lname:lname,email:email,password:passwordHash,contact:contact});
        console.log(ins)
        await ins.save((err)=>{
            if(err){
                res.json({"err":"User already Registered"})
            }
            else{
                res.json({"msg":'Registered'})
            }
        })
    },

    //Function for social register
    socialRegister : async (req,res)=>{
        console.log("...........",req.body)
        let fname=req.body._profile.firstName;
        let lname = req.body._profile.lastName;
        let email=req.body._profile.email;
        let provider=req.body._provider
        
        let ins=new customerModel({fname:fname,lname:lname,email:email,provider: provider});
        console.log(ins)
        await ins.save((err)=>{
            if(err){
                res.json({"err":"User already Registered"})
            }
            else{
                res.json({"msg":'Registered'})
            }
        })
    },

    //function for login user
    login : async (req,res)=>{
        let email=req.body.email;
        let password=req.body.password;

        const user =await customerModel.findOne({ email :email })
        console.log(user);
        if(user){
            const isMatch =await bcrypt.compare(password , user.password)
            console.log(isMatch)
            console.log(req.body.password)

            if(email === user.email && isMatch){
                let payload={
                    oid:email
                }
                const token=jwt.sign(payload,jwtSecret,{expiresIn:1060000})
                res.json({"msg" : "Login successful","token":token, "user":user._id})
            }
            else{
                res.json ({"err": "please enter correct password"})
            }
        }
        else{
            res.json({"err":'invalid email'})
        }
    },

    //Function for social login
    socialLogin : (req,res)=>{
        let email = req.body._profile.email;
        customerModel.findOne({email:email},(err,user)=>{
            if(user){
                console.log(user)
                if(req.body._provider){
                    if(user.provider == req.body._provider){
                        let payload={
                            oid:email
                        }
                        const token=jwt.sign(payload,jwtSecret,{expiresIn:1060000})
                        res.json({"msg":"Login successful","token":token})
                    }
                    else{
                        res.json({"err":"Provider not matched"})
                    }
                }
                else{
                    res.json({"err":"Please check the provider"})
                }   
            }
            else{
                res.json({"err":"User not registered"})
            }
        })
    },

    //function for sending mail of forgot password otp
    emailSend : async(req,res)=>{
        let otpcode = Math.floor((Math.random()*100000)+1);
        checkotpforpassword =otpcode;
        console.log("OTP passed",req.body.email);
        checkemail = req.body.email;
        let data = await customerModel.findOne({email:req.body.email});
        if(data){
            sendmail(otpcode,req.body.email)
            res.json({"msg": "OTP sent on email successfully "})
        }
        else{
            res.json({"err":"Email id does not exist"});
        }
    },

    //function for verifying otp
    verifyOtp :  (req, res)=> {
        console.log("VERIFY", req.body);
        if (req.body.otp == checkotpforpassword) {
            res.json({"msg": "OTP is correct" });
        } else {
            res.json({ "err": "OTP incorrect" });
        }
    },

    //function for changing password
    forgotPassword : (req,res)=>{
        console.log("FORGOT", checkemail);
        const password = req.body.password;
        const hashPassword = bcrypt.hashSync(password, saltRounds);
        customerModel.updateOne(
            { email: checkemail },
            { $set: { password: hashPassword } },
            (err) => {
                if (err) {
                    res.send({ "err" : "Error!!" });
                } else {
                    res.send({ "msg" : "Password Updated" });
                }
            }
        );
    }
}

module.exports = customerControls