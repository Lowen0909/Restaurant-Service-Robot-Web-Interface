const reserve = require("../models/reservation");
const UploadReserve=(req,res)=>{
     var data=JSON.parse(req.body.data1);
      new reserve({
         name:data.name,
         phone:data.phone,
         people:data.people,
         child:data.child,
         date:data.date,
         time:data.time
      }).save();
      res.send('reserve success');
}
const ReserveSearch=(req,res)=>{

    var Reservecheck=new Map();
    reserve.find({name:req.body.sname,phone:req.body.stel},function(err,result){
        if(err){
           console.log(err);
        }else{
            if(!result.length){
                res.send('fail');
            }else{
                Reservecheck.set("name",result[0].name);
                Reservecheck.set("phone",result[0].phone);
                Reservecheck.set("people",result[0].people);
                Reservecheck.set("child",result[0].child);
                Reservecheck.set("date",result[0].date);
                Reservecheck.set("time",result[0].time);
                var data=Object.fromEntries(Reservecheck);
                res.send(JSON.stringify(data));
            }
        }
    })
}

module.exports={
    UploadReserve,
    ReserveSearch
}