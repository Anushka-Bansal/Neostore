const express = require("express");
const cors = require('cors');

const PORT = 9999;
const app = express();
const connectDB = require("./config/db");

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

connectDB();

const customerRoutes = require('./Routes/customerRoutes');
app.use("/api/users",customerRoutes);

const productRoutes = require('./Routes/productRoutes')
app.use("/api/products",productRoutes);

const profileRoutes = require('./Routes/profileRoutes')
app.use("/api/users",profileRoutes)

const orderRoutes = require('./Routes/orderRoutes')
app.use("/api/orders",orderRoutes)

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Working on port : ${PORT}`)
})