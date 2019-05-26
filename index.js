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
setupPassport(app, passport, LocalStrategy);

//Endpoints
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/tasks", tasksRoute);
app.use("/auth", authRoute);

//Expose
export default app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
