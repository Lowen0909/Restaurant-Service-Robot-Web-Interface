const { json } = require("body-parser");
const food=require("../models/food");
const Inventory = require("../models/inventory");
const order=require("../models/order");
var getflag=false;
var item=[];
var foodInventories=new Map();
if(!getflag){
    getInventory();
}
const menuView = (req, res) => {
      res.render("menu", {layout:false});
}

const getflavor=(req,res)=>{
    var Jdata=new Map();
    Inventory.find({},function(err,result){
        if(err){
            console.log(err);
        }else{
            
            for(var i=0;i<result.length;i+=1){
                let arr=[];
                for(var j=0;j<result[i].content.length;j+=1){
                    arr.push(result[i].content[j].flavor);
                }
                Jdata.set(result[i].foodname,arr);
                if(Jdata.size==12){
                    var data=Object.fromEntries(Jdata);
                    res.send(JSON.stringify(data));
                }
            }
        }
    });  
}
function getInventory(res){
    console.log("get");
    Inventory.find({},function(err,result){
        if(err){
            console.log(err);
        }else{
            foodInventories.clear();
            for(var i=0;i<result.length;i+=1){
                let flavors=[];
                let quantities=[];
                let contents=[];
                for(var j=0;j<result[i].content.length;j+=1){
                    flavors.push(result[i].content[j].flavor);
                    quantities.push(result[i].content[j].quantity);
                }
                contents.push(flavors);
                contents.push(quantities);
                foodInventories.set(result[i].foodname,contents);
                getflag=true;
            }
        }
    });  
}
const getInventoryArray=(req,res)=>{
    var arr=JSON.stringify(Object.fromEntries(foodInventories));
    res.send(arr);
}

function saveDBtable(item){
    var index=item.length-1;
    var fname=foodInventories.get(item[index][0]);
    var index1=fname[0].indexOf(item[index][1]);
    fname[1][index1]-=parseInt(item[index][2]);
    foodInventories.set(item[index][0],fname);
    Inventory.findOne({foodname:item[index][0]},function(err,result){
        var content1=result.content;
        for(var i=0;i<content1.length;i++){
            if(content1[i].flavor==item[index][1]){
                var newq=content1[i].quantity-parseInt(item[index][2]);
                content1[i]=new food({
                    flavor:item[index][1],
                    quantity:newq
                 });
                 result.content=content1;
                 result.save(function(err){
                    if(err){
                        console.log('save error');
                        console.log(err);
                    }
                    item.pop();
                    if(!item.length){
                       return;
                    }else{
                        saveDBtable(item);
                        return;
                    }
                    
                 });
            }
        }
        
    });
}
const UploadOrder=(req,res)=>{
       let newOrder=new order({
           seat:req.body.seat,
           content:[],
           price:parseInt(req.body.price)
       });
       var arr1=[];
       var data=new Map(Object.entries(JSON.parse(req.body.data1)));
       item.push()
       for(var [a,b] of data){
           var arr2=[]
           var n=a.split('/');
           if(n.length==2){
            arr2.push(n[0],n[1],b);
            item.push(arr2);
           }
       }
       saveDBtable(item);
       for(var [a,b] of data){
           var n=a.split('/');
           let newMeal=new Inventory({
               foodname:n[0],
               content:[]
           });
           if(n.length==2){              
                let meal=new food({
                   flavor:n[1],
                   quantity:parseInt(b)
                });
                newMeal.content=[meal];
            }
            if(n.length==3){
                let meal=new food({
                   ice:n[1],
                   sugar:n[2],
                   quantity:parseInt(b)
                });
                newMeal.content=[meal];
            }

            arr1.push(newMeal);
       }
       newOrder.content=arr1;
       newOrder.save().then(console.log('save success'));
       res.send('');
}

class customer {
    constructor(id,seat,price,order) {
      this.id=id;
      this.seat = seat;
      this.price = price;
      this.order=order;
    }
  }

const OrderList=(req,res)=>{
    res.render("orders",{title:"Orders",page:1,script: "order.js"});
}
const OrderSearch=(req,res)=>{
    var data1=[];
    const CustomerOrder=order.find({},function(err,posts){
        for(var i=0;i<posts.length;i+=1){
            var meal=[]
            for(var j=0;j<posts[i].content.length;j+=1){
                var detail="";
                detail=detail+posts[i].content[j].foodname+"(";
                for(var k=0;k<posts[i].content[j].content.length;k+=1){
                    if(posts[i].content[j].content[k].flavor!='none')
                      detail=detail+posts[i].content[j].content[k].flavor+" ";
                    if(posts[i].content[j].content[k].sugar!='none')
                      detail=detail+posts[i].content[j].content[k].sugar+" ";
                    if(posts[i].content[j].content[k].ice!='none')
                      detail=detail+posts[i].content[j].content[k].ice+" ";
                    detail+=")"
                    if(posts[i].content[j].content[k].quantity!='none')
                      detail=detail+"*"+posts[i].content[j].content[k].quantity;
                }
                meal.push(detail);
            }
            var custom=new customer(posts[i].id,posts[i].seat,posts[i].price,meal);
            data1.push(custom);
        }
        res.send(data1);
    }).sort({ _id: -1 });
}

const orderDel=(req,res)=>{
    order.deleteOne({_id: req.body.id}, function(err) {
        if(err) return console.log(err);
        res.send({data:"success"});
    })
}

const orderDetail=(req,res)=>{
    order.findById(req.body.id, function(err,result) {
        if(err) return console.log(err);
        var detail="";
        for(var j=0;j<result.content.length;j+=1){  
            detail=detail+result.content[j].foodname+"(";
        for(var k=0;k<result.content[j].content.length;k+=1){
            if(result.content[j].content[k].flavor!='none')
              detail=detail+result.content[j].content[k].flavor+" ";
            if(result.content[j].content[k].sugar!='none')
              detail=detail+result.content[j].content[k].sugar+" ";
            if(result.content[j].content[k].ice!='none')
              detail=detail+result.content[j].content[k].ice+" ";
            detail+=")"
            if(result.content[j].content[k].quantity!='none'&&result.content[j].content[k].flavor!='none')
              if(parseInt(result.content[j].content[k].quantity)>=2)
                 detail=detail+"      "+result.content[j].content[k].quantity+" pieces\n";
              else
                 detail=detail+"      "+result.content[j].content[k].quantity+" piece\n";
            if(result.content[j].content[k].quantity!='none'&&result.content[j].content[k].ice!='none')
               if(parseInt(result.content[j].content[k].quantity)>=2)
                 detail=detail+"      "+result.content[j].content[k].quantity+" cups\n";
               else
                 detail=detail+"      "+result.content[j].content[k].quantity+" cup\n";
        }
      }
        res.send({seat:result.seat,price:result.price,order:detail});
    });
}
module.exports =  {
    menuView,
    getflavor,
    UploadOrder,
    OrderList,
    orderDel,
    orderDetail,
    getInventoryArray,
    OrderSearch
};