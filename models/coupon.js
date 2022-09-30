const mongoose = require("mongoose");
const couponSchema = new mongoose.Schema({
    serial: {
      type: String,
      required: true,
    },
    discount: {
      type: String,
      required: true,
    }
  });
const coupon = mongoose.model("coupon", couponSchema);
module.exports = coupon;