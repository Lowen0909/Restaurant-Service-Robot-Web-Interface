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
const food = mongoose.model("food", foodSchema);
module.exports =food;