const mongoose = require("mongoose");
const inventory=require("../models/inventory");
const orderSchema = new mongoose.Schema({
  seat: {
    type: String,
    required: true,
  },
  content: {
    type:[inventory.schema],
    required:true
  },
  price:{
    type:Number,
    required:true
  }
});
const order = mongoose.model("order", orderSchema);
module.exports =order;