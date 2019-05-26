import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
const uuid = require("uuid/v4");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
import tasksRoute from "./controllers/tasks";

const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
import { setupPassportLocal } from "./passport/passport-local-strategy";

const app = express();
const port = 3000;

//Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    genid: req => {
      console.log("Inside session middleware genid function");
      console.log(`Request object sessionID from client: ${req.sessionID}`);
      return uuid(); // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
setupPassportLocal(app, passport, LocalStrategy);

//Endpoints
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/tasks", tasksRoute);

//Expose
export default app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
