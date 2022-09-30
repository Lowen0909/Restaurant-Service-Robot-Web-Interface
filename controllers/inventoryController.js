const food =require("../models/food");
const inventory = require("../models/inventory");
const InventoryView=(req,res)=>{
    res.render('food',{layout:false});
};

const InventoryUpload = (req, res) => {
   inventory.deleteMany({},function(err){
      console.log('All Data successfully deleted');
      console.log(req.body.a);
      var data=Object.entries(JSON.parse(req.body.a));
      for(var[A,B] of data){
         var arr=[];
         for(var j=0;j<B.length;j+=1){
            let B_new=B[j].split('/');
            let meal=new food({
               flavor:B_new[0],
               quantity:B_new[1]
            });
            arr.push(meal);
         }
         console.log(A);
         const newInventory = new inventory({
               foodname:A,
               content:arr
         });
         newInventory.save().then(console.log('save success'));  
      }
   });
     
  res.send('Finish');    
};

const InventoryUpdate = (req, res) => {
  var data=JSON.parse(req.body);
  for(var[A,B] of data){
     var arr=[];
     for(var j=0;j<B.length;j+=1){
        let B_new=B[j].split('/');
        let meal=new food({
           flavor:B_new[0],
           quantity:parseInt(B_new[1])
        });
        arr.push(meal);
     }
     const newInventory = new Inventory({
          foodname:A,
          content:arr
        });
      Inventory.findOneAndUpdate({foodname: A},newInventory).then(console.log('update success !')).catch((err) => console.log(err));
  }       
};

module.exports =  {
 InventoryView,
 InventoryUpload,
 InventoryUpdate
};