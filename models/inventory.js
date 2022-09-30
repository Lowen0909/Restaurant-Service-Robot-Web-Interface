const mongoose = require("mongoose");
const foodSchema=new mongoose.Schema({
  flavor:{
    type: String,
    default:"none",
  },
  quantity:{
    type: Number,
    required: true,
  },
  ice:{
    type:String,
    default:"none",
  },
  sugar:{
    type:String,
    default:"none",
  }
});
const inventorySchema = new mongoose.Schema({
  foodname: {
    type: String,
    required: true,
  },
  content: {
    type:[foodSchema],
    required:true
  }
});

const inventory = mongoose.model("inventory", inventorySchema);
module.exports = inventory;
