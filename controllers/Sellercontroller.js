const Seller = require("../models/Seller")  //importing models
const Art = require("../models/Art")

const multer = require('multer')
const path = require('path')
const fs = require('fs')

const insertseller = async (request, response) => {
    try 
    {
      const input = request.body;
      const seller = new Seller(input);
      await seller.save();
      response.send('Registered Successfully');
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };

  const checksellerlogin = async (request, response) => 
  {
     try 
     {
       const input = request.body
       const seller = await Seller.findOne(input)
       response.json(seller)
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };

   const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './media/'); // Destination folder
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // File naming convention
    }
  });
  
  const upload = multer({ storage: storage }).single('file');

  const addart = async (req, res) =>
    {
      try 
      {
        upload(req, res, async function (err) 
        {
          if (err) 
          {
            console.error(err);
            return res.status(500).send(err.message);
          }
          
          const { category, title, description, price} = req.body;
          const fileName = req.file ? req.file.filename : undefined; // Extracting file name
    
          const newArt = new Art({
            category,
            title,
            description,
            price,
            file: fileName // Save only the file name
          });
    
          await newArt.save();
          res.status(200).send('Art Added Successfully');
        });
      } 
      catch (error) 
      {
        console.error(error);
        res.status(500).send(error.message);
      }
    };

    const changesellerpassword = async (request, response) => {
      try 
      {
        const { email, oldpassword, newpassword } = request.body;
  
        const seller = await Seller.findOne({ email, password: oldpassword });
        
         if (!seller) 
        {
          response.status(400).send('Invalid Old Password');
        }
        else
        {
            if(oldpassword==newpassword)
            {
              response.status(400).send('Both Passwords are Same');
            }
            else
            {
              await Seller.updateOne({email},{ $set: { password: newpassword } });
               response.json('Password Updated Successfully');
            }
        }
      } 
      catch (error) 
      {
        response.status(500).send(error.message);
      }
    };

    const artimage = async (req, res) => 
{
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../media', filename);
  console.log(filepath)

    fs.readFile(filepath, (err, data) => {
      if (err) 
      {
        console.error(err);
        return res.status(500).send('Error reading image file');
      }
     
    const ext = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream'; // Default to octet-stream(binary data)

if (ext === '.png') {
  contentType = 'image/png';
} else if (ext === '.jpg' || ext === '.jpeg') {
  contentType = 'image/jpeg';
} else if (ext === '.pdf') {
  contentType = 'application/pdf';
} else if (ext === '.txt') {
  contentType = 'text/plain';
}

    res.setHeader('Content-Type', contentType);
      res.send(data);
    })
}

const updatesellerprofile = async (request, response) => 
  {
    try 
    {
      const input = request.body;
      const email = input.email; 
      const seller = await Seller.findOne({ email });
      if (!seller) 
      {
        response.status(200).send('Job seeker not found with the provided email id');
      }
      for (const key in input) 
      {
        if (key !== 'email' && input[key]) {
          customer[key] = input[key];
        }
      }
      await customer.save();
      response.status(200).send('Job Seeker Profile Updated Successfully');
    } 
    catch (e) 
    {
      response.status(500).send(e.message);
    }
  };

  const sellerprofile = async (request, response) => 
   {
      try 
      {
        const email = request.params.email
        const seller = await Seller.findOne({email})
        if(seller)
        {
          response.json(seller)
        }
        else
        {
          return response.status(200).send('Seller not found with the provided email id');
        }
        
      } 
      catch (error) 
      {
        response.status(500).send(error.message);
      }
    };

  module.exports = {insertseller,checksellerlogin,artimage,addart,changesellerpassword,sellerprofile,updatesellerprofile}