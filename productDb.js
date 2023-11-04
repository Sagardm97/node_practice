const connectDB=require("./db/connect");
const product = require("./models/product");
const Product =require("./models/product")
require("dotenv").config();

const productJson= require("./products.json")
const start=async()=>{
    try {
        await connectDB(process.env.MONGODB_URL)
        await Product.create(productJson);
        console.log("Successssssss broo finally");
    } catch (error) {
        console.log(error)
        
    }
}

start()

