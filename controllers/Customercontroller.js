const Customer = require("../models/Customer")  //importing models
const Art = require("../models/Art")

const multer = require('multer')
const path = require('path')
const fs = require('fs')

const insertcustomer = async (request, response) => {
    try 
    {
      const input = request.body;
      const customer = new Customer(input);
      await customer.save();
      response.send('Registered Successfully');
    } 
    catch(e) 
    {
      response.status(500).send(e.message);
    }
  };

  const checkcustomerlogin = async (request, response) => 
  {
     try 
     {
       const input = request.body
       const customer = await Customer.findOne(input)
       response.json(customer)
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };

   const customerprofile = async (request, response) => 
   {
      try 
      {
        const email = request.params.email
        const customer = await Customer.findOne({email})
        if(customer)
        {
          response.json(customer)
        }
        else
        {
          return response.status(200).send('Job seeker not found with the provided email id');
        }
        
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

  const changecustomerpassword = async (request, response) => {
    try 
    {
      const { email, oldpassword, newpassword } = request.body;

      const customer = await Customer.findOne({ email, password: oldpassword });
      
       if (!customer) 
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
            await Customer.updateOne({email},{ $set: { password: newpassword } });
             response.json('Password Updated Successfully');
          }
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const updatecustomerprofile = async (request, response) => 
  {
    try 
    {
      const input = request.body;
      const email = input.email; 
      const customer = await Customer.findOne({ email });
      if (!customer) 
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

  
  const upload = multer({ storage: storage }).single('file');

  const viewarts = async (req, res) => 
{
  try 
  {
    const arts = await Art.find();
    res.status(200).json(arts);
  } 
  catch (error) 
  {
    res.status(500).send(error.message);
  }
};

const viewart = async (request, response) => 
   {
      try 
      {
        const artId = request.params.artId
        const art = await Art.findOne({artId})
        if(art)
        {
          response.json(art)
        }
        else
        {
          return response.status(200).send('Art not found with provided artId');
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

  module.exports = {insertcustomer,checkcustomerlogin,viewarts,artimage,viewart,changecustomerpassword,updatecustomerprofile,customerprofile}