import express from "express";
import { createUser, getAllUsers, loginUser } from "../database/actions";
import { User } from "../database/connector";

export const setupPassportLocal = (app, passport, LocalStrategy) => {
  passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function(id, cb) {
    User.findOne({ where: { id } })
      .then(user => {
        cb(null, user);
      })
      .catch(error => {
        cb(error);
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
  const router = express.Router();

  router.get("/success", (req, res) =>
    res.send("Welcome " + req.query.email + "!!")
  );
  router.get("/error", (req, res) =>
    res.send("error logging in" + req.query.email)
  );

  router.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/auth/local/error" }),
    function(req, res) {
      res.redirect("/auth/local/success?email=" + req.user.email);
    }
  );

  // get all users
  router.get("/users", (req, res) => {
    getAllUsers()
      .then(user => {
        res.send(user);
      })
      .catch(error => {
        console.log(error);
        res.status(500).send("Error getting users");
      });
  });

  // register route
  router.post("/register", (req, res, next) => {
    const { email, password } = req.body;
    createUser({ email, password })
      .then(user => {
        res.json({ user, msg: "account created successfully" });
      })
      .catch(error => {
        console.log(error);
        res.status(500).send("Error creating user");
      });
  });

  app.use("/auth/local", router);
};
