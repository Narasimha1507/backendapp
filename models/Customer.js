const mongoose = require("mongoose")

const customerschema = new mongoose.Schema({
    CustomerId: {
    type: String,
    unique: true,
    required: true,
    default: () => generateRandomId()
  },
    fullname: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required:true,
      enum: ['male', 'female', 'others']
    },
    dateofbirth: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    contact: {
        type: String,
        required: true,
        unique:true
      },
  });

const customer = mongoose.model('customer', customerschema);

function generateRandomId() {
  const min = 100000;
  const max = 999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return "J" + randomNumber;
}

module.exports = customer;