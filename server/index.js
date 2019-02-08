require("dotenv").config();
const express = require("express");
const massive = require("massive");
const sessions = require("express-session");
const ctrl = require("./controller");

const { SERVER_PORT, DB_CONNECTION, SESSION_SECRET } = process.env;

const app = express();

app.use(express.json());
app.use(
  sessions({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    maxAge: null
  })
);

massive(DB_CONNECTION).then(db => {
  app.set("db", db);
  app.listen(SERVER_PORT, () =>
    console.log(`Houston we have lift off on port ${SERVER_PORT}`)
  );
});

// authentication
app.post("/auth/register", ctrl.register);
app.post("/auth/login", ctrl.login);
app.post("/auth/logout", ctrl.logout);

// userdata
app.get("/api/user", ctrl.getUser);
