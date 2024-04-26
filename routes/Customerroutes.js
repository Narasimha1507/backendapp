const customercontroller = require("../controllers/Customercontroller")

const express = require("express")
const customerrouter = express.Router()

// job seekeer routes
customerrouter.post("/insertcustomer",customercontroller.insertcustomer)
customerrouter.post("/checkcustomerlogin",customercontroller.checkcustomerlogin)


customerrouter.get("/viewarts",customercontroller.viewarts)
customerrouter.get("/artimage/:filename",customercontroller.artimage)
customerrouter.get("/viewart/:artId",customercontroller.viewart)

customerrouter.put("/changecustomerpassword",customercontroller.changecustomerpassword)
customerrouter.put("/updatecustomerprofile",customercontroller.updatecustomerprofile)
customerrouter.get("/customerprofile/:email",customercontroller.customerprofile)


module.exports = customerrouter