import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import uuid from "uuid/v4";
import session from "express-session";
const FileStore = require("session-file-store")(session);
import passport from "passport";
const LocalStrategy = require("passport-local").Strategy;

import tasksRoute from "./controllers/tasks";
import { setupPassportLocal } from "./passport/passport-local-strategy";
import { isAuthenticated } from "./passport/isAuthenticated";

const app = express();
const port = 3000;

//Middleware
var corsOptions = {
  origin: "http://localhost:3001",
  credentials: true,
  allowedHeaders: ["sessionID", "Content-Type", "Authorization"],
  exposedHeaders: ["sessionID"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: true
};

app.use(cors(corsOptions));
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
    cookie: {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
      domain: "localhost"
    },
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());
setupPassportLocal(app, passport, LocalStrategy);

//Endpoints

app.use("/api/tasks", isAuthenticated, tasksRoute);

//Expose
export default app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
