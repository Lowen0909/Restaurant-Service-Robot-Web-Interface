const bcrypt = require("bcryptjs");
LocalStrategy = require("passport-local").Strategy;
const Admin = require("../models/admin");
const Check = passport => {
  passport.use(
    new LocalStrategy({ usernameField: "account" }, (account, password, done) => {
      Admin.findOne({ account: account }).then((admin) => {
          if (!admin) {
            console.log("wrong account");
            return done();
          }
          bcrypt.compare(password, admin.password, (error, isMatch) => {
            if (error) throw error;
            if (isMatch) {
              return done(null, admin);
            } else {
              console.log("Wrong password");
              return done();
            }
          });
        }).catch((error) => console.log(error));
    })
  );
  passport.serializeUser((admin, done) => {
       done(null, admin.id);
  });
  passport.deserializeUser((id, done) => {
    Admin.findById(id, (error, admin) => {
          done(error, admin);
    });
  });
};
module.exports = {
  Check,
};