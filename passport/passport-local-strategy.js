import express from "express";
import { loginUser } from "../database/actions";

export const setupPassport = (app, passport, LocalStrategy) => {
  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    User.findById(id, function(err, user) {
      cb(err, user);
    });
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email"
      },
      function(email, password, done) {
        loginUser({ email, password })
          .then(user => {
            if (!user) {
              return done(null, false, { msg: "No such user found", user });
            }
            if (user.password === password) {
              // from now on we’ll identify the user by the id and the id is
              // the only personalized value that goes into our token
              let payload = { id: user.id };
              console.log(user);
              return done(null, user);
            } else {
              return done(null, false, { msg: "Password is incorrect", user });
            }
          })
          .catch(error => {
            console.log(error);
            return done(err);
          });
      }
    )
  );

  app.get("/success", (req, res) =>
    res.send("Welcome " + req.query.email + "!!")
  );
  app.get("/error", (req, res) =>
    res.send("error logging in" + req.query.email)
  );

  app.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/error" }),
    function(req, res) {
      res.redirect("/success?email=" + req.user.email);
    }
  );
};
