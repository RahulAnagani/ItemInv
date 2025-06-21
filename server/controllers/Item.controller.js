const { validationResult } = require("express-validator");
const Item = require("../Models/Item");

module.exports.AddItem = async (req, res) => {
  const errors = validationResult(req);
  console.log(errors,req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, msg: "Not all upload fields are submitted :(" });
  }

  try {
    const newItem = new Item({
      itemName: req.body.itemName,
      itemType: req.body.itemType,
      itemDescription: req.body.itemDescription,
      coverImage: req.files['coverImage'][0].filename,
      additionalImages: req.files['additionalImages']?.map(file => file.filename) || []
    });

    await newItem.save();
    return res.status(200).json({ success: true, msg: "Successfully added the item :)" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, msg: "Internal server error :(" });
  }
};


module.exports.getItem=async(req,res)=>{
    try{
        const items=await Item.find();
        res.status(200).json({success:true,items:items});
    }
    catch(e){
        res.status(500).json({success:false,msg:"Internal server error :("});
    }
}

module.exports.getItemById=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success:false,msg:"Not all fields are submitted :("});
    }
    try{
        const {ItemId}=req.query;
        const item=await Item.findById(ItemId);
        return res.status(200).json({success:true,item:item});
    }
    catch(e){
        console.log(e);
        return res.status(500).json({success:false,msg:"Internal server error :("});
    }
}