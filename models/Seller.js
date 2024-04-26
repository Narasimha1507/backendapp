const mongoose = require("mongoose")

const sellerschema = new mongoose.Schema({
    SellerId: {
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

const seller = mongoose.model('seller', sellerschema);

function generateRandomId() {
  const min = 100000;
  const max = 999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return "J" + randomNumber;
}

module.exports = seller;