const sellercontroller = require("../controllers/Sellercontroller")

const express = require("express")
const sellerrouter = express.Router()

// job seekeer routes
sellerrouter.post("/insertseller",sellercontroller.insertseller)
sellerrouter.post("/checksellerlogin",sellercontroller.checksellerlogin)


sellerrouter.post("/addart",sellercontroller.addart)
sellerrouter.get("/artimage/:filename",sellercontroller.artimage)

sellerrouter.put("/changesellerpassword",sellercontroller.changesellerpassword)

sellerrouter.put("/updatesellerprofile",sellercontroller.updatesellerprofile)
sellerrouter.get("/sellerprofile/:email",sellercontroller.sellerprofile)


module.exports = sellerrouter