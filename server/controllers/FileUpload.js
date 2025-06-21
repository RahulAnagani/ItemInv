const multer=require("multer");
const {v4:uuidv4}=require("uuid");
const path=require("path");
const fs = require("fs");

const uploadPath = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, uploadPath);
    },
    filename:function(req,file,cb){
        const ext=path.extname(file.originalname);
        const basename=path.basename(file.originalname,ext);
        const uniqueName=`${basename}-${uuidv4()}${ext}`
        cb(null,uniqueName);
    }
});
const upload=multer({storage});
module.exports=upload;