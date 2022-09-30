const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  tel: {
    type: String,
    required: true,
  },
  message:  String,    
  employSatis: Number,
  mealSatis: Number
});
const contacts = mongoose.model("contacts", contactSchema);
module.exports = contacts;