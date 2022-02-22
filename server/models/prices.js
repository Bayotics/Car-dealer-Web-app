const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const priceSchema = new Schema({
  name: String,
  createdAt: { type: Date, default: Date.now },
  image: String
});

module.exports = mongoose.model('Price', priceSchema);
