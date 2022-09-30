const mongoose = require("mongoose");
const reservationSchema=new mongoose.Schema({
    name:
    {
        type:String,
        required:true
    },
    phone:
    {
        type:String,
        required:true
    },
    people:
    {
        type:String,
        required:true
    },
    child:
    {
        type:String,
        required:true
    },
    date:
    {
        type:String,
        required:true
    },
    time:
    {
        type:String,
        required:true
    }
});
const reservation = mongoose.model("reservation", reservationSchema);
module.exports = reservation;