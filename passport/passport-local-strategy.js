import express from "express";
import { createUser, getAllUsers, loginUser } from "../database/actions";
import { User } from "../database/connector";
import { isAuthenticated } from "./isAuthenticated";

export const setupPassportLocal = (app, passport, LocalStrategy) => {
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

  passport.deserializeUser((id, cb) => {
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
      (email, password, done) => {
        loginUser({ email, password })
          .then(user => {
            if (!user) {
              return done(null, false, { msg: "No such user found", user });
            }
            if (user.password === password) {
              // from now on we’ll identify the user by the id and the id is
              // the only personalized value that goes into our token
              let payload = { id: user.id };
              console.log(user.id);
              return done(null, payload);
            } else {
              return done(null, false, {
                msg: "Password is incorrect",
                payload
              });
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

  // router.get("/success", (req, res) =>
  //   res.send("Welcome " + req.session + "!!")
  // );
  router.get("/error", (req, res) =>
    res.send("error logging in" + req.query.email)
  );

  router.post(
    "/login",
    passport.authenticate("local", { failureRedirect: "/auth/local/error" }),
    (req, res) => {
      // res.redirect("/auth/local/success?email=" + req.user.email);
      req.session.name = "Flavio";
      // simple count for the session
      if (!req.session.count) {
        req.session.count = 0;
      }
      req.session.count += 1;
      console.log(req.sessionID);
      console.log(req.isAuthenticated());

      // send info as json
      // res.json(req.session);
      res.send(req.session);
    }
  );

  // get all users
  router.get("/users", isAuthenticated, (req, res) => {
    getAllUsers()
      .then(user => {
        console.log(req.isAuthenticated());
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

  app.use("/api/auth/local", router);
};
