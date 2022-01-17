const express = require("express");
const cors = require('cors');
// const mongoose = require("mongoose");
const PORT = 9999;
const app = express();
const connectDB = require("./config/db");
// const router = require("./routes/employeeRoutes");
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

// const registerModel = require('./Models/CustomerSchema')

connectDB();

const customerRoutes = require('./Routes/customerRoutes');
app.use("/api/users",customerRoutes);

const productRoutes = require('./Routes/productRoutes')
app.use("/api/products",productRoutes);

const profileRoutes = require('./Routes/profileRoutes')
app.use("/api/users",profileRoutes)

const orderRoutes = require('./Routes/orderRoutes')
app.use("/api/orders",orderRoutes)

// app.get("/",(req,res)=>{
//     res.send("Welcome to E-Commerce")
// })

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Working on port : ${PORT}`)
})