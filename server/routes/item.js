const router = require("express").Router();
const { AddItem,getItem,getItemById} = require("../controllers/Item.controller");
const upload = require("../controllers/FileUpload");
const express_validator=require("express-validator")
router.post(
  "/addItem",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "additionalImages", maxCount: 10 }
  ]),
  express_validator.body("itemName").trim().notEmpty().withMessage("Item name is required"),
  express_validator.body("itemType").trim().notEmpty().withMessage("Item type is required"),
  express_validator.body("itemDescription").trim().notEmpty().withMessage("Description is required"),
  AddItem
);

router.get("/getItems",getItem)
router.get("/getItem",express_validator.query("ItemId").isMongoId(),getItemById);
module.exports = router;
