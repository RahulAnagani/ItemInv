const mongoose=require("mongoose");
const connectDb=async ()=>{
    const uri=process.env.URI;
    try{
        const connection=await mongoose.connect(uri);
        console.log("Connected to the DataBase"  ,String(connection.connection.host));
    }
    catch(e){
        console.log("Error occured in connecting the data base : ( ");
    }
}
module.exports=connectDb;