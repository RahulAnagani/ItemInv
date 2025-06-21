const mongoose=require("mongoose");
const ItemSchema=new mongoose.Schema({
    itemName:{type:String,required:true},
    itemType:{type:String,required:true},
    itemDescription:{type:String,required:true},
    coverImage:{type:String,required:true},
    additionalImages:[String]
})
module.exports=mongoose.model("Item",ItemSchema);