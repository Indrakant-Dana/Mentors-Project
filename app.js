const http = require("http");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");

// const mentorRouter = require("./routes/mentors");
// const menteeRouter = require("./routes/mentees");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");

const app = express();

const { auth } = require("express-openid-connect");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: "a long, randomly-generated string stored in env",
  baseURL: "http://localhost:3000",
  clientID: "jOrqkvv11u1YCZbd0Wbn8UXQj3nyMjyM",
  issuerBaseURL: "https://dev-yvm0dudd.us.auth0.com",
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get("/login", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.use("/api/v1/mentors", mentorRouter);
// app.use("/api/v1/mentees", menteeRouter);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
module.exports = app;
