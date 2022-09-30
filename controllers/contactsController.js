const Contacts = require("../models/contacts");
const ContactsCRUD = (req, res) => {
  if(req.body.action=="del"){
    Contacts.deleteOne({_id: req.body.id}, function(err) {
  		if(err) return console.log(err);
  		res.send({data:"success"});
  	})
  }else if(req.body.action=="detail"){
    const posts=Contacts.findOne({_id:req.body.id},function(err,posts){
      if(err){
        console.log(err);
      }else{
        res.send(posts);
      }
     });
  }else{
    console.log("no operation");
  }         
};
const Upload = (req, res) => {
    const { name, email, tel, message, employSatis,mealSatis } = req.body;
    const newContacts = new Contacts({
            name,
            email,
            tel,
            message,
            employSatis,
            mealSatis,
          });
    newContacts.save().then(res.redirect("/transition")).catch((err) => console.log(err));
            
};

const ContactsView=(req,res)=>{
     res.render("contacts",{title:"Contacts",page:1,script: "contact.js"});
};

const ContactsData=(req,res)=>{
  const posts=Contacts.find({},function(err,posts){
    res.send(posts);
   }).sort({ _id: -1 });
};



module.exports =  {
  Upload,
  ContactsView,
  ContactsCRUD,
  ContactsData
};