const bcrypt = require("bcryptjs");
const admin = require("../models/admin");
const passport = require("passport");

const catalogView = (req, res) => {
    res.render("catalog", {title:'Catalog',script:"space.js"} );
}
const loginView = (req, res) => {
    res.render("login", {layout:false,error:""} );
}

const loginUser = (req, res) => {
    const { account, password } = req.body;
    if(account==""||password==""){
      res.render("login", {layout:false,error:"Please enter your account and password !"} );
    }
    else {
      passport.authenticate("local", function(err, user) {
        if (err) {
          return next(err); 
        }
        if (! user) {
          return res.render("login", {layout:false,error:"Wrong account or password !"} );
        }
        req.login(user, loginErr => {
          if (loginErr) {
            return next(loginErr);
          }
          return res.redirect('/catalog');
        });      
      }
      )(req, res);
    }
  };


const registerView = (req, res) => {
    res.render("register", {} );
}
const registerUser = (req, res) => {
    const { account, password,username } = req.body;
    const newAdmin = new admin({
          account,
          password,
          username,
    });
    bcrypt.genSalt(10, (err, salt) =>bcrypt.hash(newAdmin.password, salt, (err, hash) => {
            if (err) throw err;
            newAdmin.password = hash;
            newAdmin.save().then(res.redirect("/login")).catch((err) => console.log(err));
        })
    );
}
module.exports =  {
    catalogView,
    loginView,
    loginUser,
    registerView,
    registerUser
};