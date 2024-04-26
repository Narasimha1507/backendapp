const Customer = require("../models/Customer")
const Admin = require("../models/Admin")
const Seller = require("../models/Seller");
const Art = require("../models/Art")

 const viewcustomers = async (request, response) => 
 {
    try 
    {
      const customers = await Customer.find();
      if(customers.length==0)
      {
        response.send("DATA NOT FOUND");
      }
      else
      {
        response.json(customers);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };


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


  const viewsellers = async (request, response) => 
 {
    try 
    {
      const sellers = await Seller.find();
      if(sellers.length==0)
      {
        response.send("DATA NOT FOUND");
      }
      else
      {
        response.json(sellers);
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };



  const deletecustomer = async (request, response) => 
 {
    try 
    {
      const email = request.params.email
      const customer = await Customer.findOne({"email":email})
      if(customer!=null)
      {
        await Customer.deleteOne({"email":email})
        response.send("Deleted Successfully")
      }
      else
      {
        response.send("Email ID Not Found")
      }

    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };


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

  const deleteseller = async (request, response) => 
  {
     try 
     {
       const email = request.params.email
       const seller = await Seller.findOne({"email":email})
       if(seller!=null)
       {
         await Seller.deleteOne({"email":email})
         response.send("Deleted Successfully")
       }
       else
       {
         response.send("Email ID Not Found")
       }
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };
   
   const deleteart = async (request, response) => 
   {
      try 
      {
        const artId = request.params.artId
        const art = await Art.findOne({"artId":artId})
        if(artId!=null)
        {
          await Art.deleteOne({"artId":artId})
          response.send("Deleted Successfully")
        }
        else
        {
          response.send("Email ID Not Found")
        }
      } 
      catch (error) 
      {
        response.status(500).send(error.message);
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

   const changeadminpassword = async (request, response) => {
    try 
    {
      const { username, oldpassword, newpassword } = request.body;

      const admin = await Admin.findOne({ username, password: oldpassword });
      
       if (!admin) 
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
            await Admin.updateOne({username},{ $set: { password: newpassword } });
             response.json('Password Updated Successfully');
          }
        
      }
    } 
    catch (error) 
    {
      response.status(500).send(error.message);
    }
  };

  const checkadminlogin = async (request, response) => 
  {
     try 
     {
       const input = request.body
       console.log(input)
       const admin = await Admin.findOne(input)
       response.json(admin)
     } 
     catch (error) 
     {
       response.status(500).send(error.message);
     }
   };
  

  module.exports = {viewcustomers,deletecustomer,checkadminlogin,insertseller,viewsellers,deleteseller,insertcustomer,changeadminpassword,viewart,deleteart}