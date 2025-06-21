const express=require("express");
const app=express();
const dotenv=require("dotenv").config();
const cors=require("cors");
const item=require("./routes/item")
const connectDb=require("./config/connect")
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use("/item",item);
app.get("/",(req,res)=>{
    res.send("Items");
});
connectDb();
module.exports=app;