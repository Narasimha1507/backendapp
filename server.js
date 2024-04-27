const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config();

const dburl = process.env.mongodburl
mongoose.connect(dburl).then(() => {
    console.log("Connected to DataBase Successfully")
}).catch((err) => {
    console.log(err.message)
});

const app = express()
app.use(express.json())   //to parse JSON data
app.use(cors())       //for enabling CORS

const adminrouter = require("./routes/Adminroutes")
const customerrouter = require("./routes/Customerroutes")
const sellerrouter = require("./routes/Sellerroutes")
app.use("",adminrouter)
app.use("",customerrouter)
app.use("",sellerrouter)

const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})