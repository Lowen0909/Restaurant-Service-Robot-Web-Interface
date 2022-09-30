const coupon = require("../models/coupon");
const mazeView=(req,res)=>{
   res.render('maze',{layout:false});
};
const handView=(req,res)=>{
   res.render('handgame',{layout:false});
};
const pricechange=(req,res)=>{
  coupon.find({serial:req.body.serial},function(err,result){
       if(!result.length){
          res.send('not found');
       }else{
         console.log(result);
          res.send({discount:result[0].discount});
       }
  });  
}

module.exports =  {
    mazeView,
    handView,
    pricechange
};