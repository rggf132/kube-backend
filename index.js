import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import tasksRoute from "./controllers/tasks";

import authRoute from "./controllers/auth";
// import passport and passport-jwt modules
var passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
import { setupPassport } from "./passport/passport-local-strategy";

const app = express();
const port = 3000;

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());
setupPassport(passport, LocalStrategy);

app.get("/success", (req, res) =>
  res.send("Welcome " + req.query.email + "!!")
);
app.get("/error", (req, res) => res.send("error logging in" + req.query.email));

//Endpoints
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/tasks", tasksRoute);
app.use("/auth", authRoute);

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/error" }),
  function(req, res) {
    res.redirect("/success?email=" + req.user.email);
  }
);

//Expose
export default app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
