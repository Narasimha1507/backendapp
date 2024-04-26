const admincontroller = require("../controllers/Admincontroller")

const express = require("express")
const adminrouter = express.Router()

// admin routes
adminrouter.get("/viewcustomers",admincontroller.viewcustomers)
adminrouter.get("/viewsellers",admincontroller.viewsellers)
adminrouter.post("/checkadminlogin",admincontroller.checkadminlogin)
adminrouter.delete("/deletecustomer/:email",admincontroller.deletecustomer)
adminrouter.delete("/deleteseller/:email",admincontroller.deleteseller)
adminrouter.delete("/deleteart/:artId",admincontroller.deleteart)
adminrouter.post("/insertseller",admincontroller.insertseller)
adminrouter.put("/changeadminpassword",admincontroller.changeadminpassword)
adminrouter.get("/viewart/:artId",admincontroller.viewart)


module.exports = adminrouter