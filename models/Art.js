const mongoose = require('mongoose');

const artSchema = new mongoose.Schema({
  artId: {
    type: String,
    unique: true,
    required: true,
    default: () => generateRandomId()
  },
  category: {
        type: String,
        required: true,
      },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  file: {
    type: String, //URL
    required: true,
  },
});

const art = mongoose.model('Art', artSchema);

function generateRandomId() {
  const min = 100000;
  const max = 999999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return "J" + randomNumber;
}

module.exports = art;