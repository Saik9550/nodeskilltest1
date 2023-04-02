//use npm start

// install express server using npm install express
//package-lock json will be created once we install express and it contains all express dependencies.

//now we need to import express module by require

require("dotenv").config()
const express = require("express")

const passport = require("passport")
const passportLocal = require("./configs/passport-local-strategy")
const session = require("express-session")

// to store session
const MongoStore = require("connect-mongo")(session)
const port = process.env.PORT || 8000

const cookieParser = require("cookie-parser")

//acquire the configurations of mongoose before firing up the server
const db = require("./configs/mongoose")

// create an instance of the express
const app = express()

app.use(cookieParser())
app.use(express.static("./assets"))

// we are going to set our view engine to ejs (install ejs first)
app.set("view engine", "ejs")
app.set("views", "./views")

app.use(
  session({
    name: "studentList",
    // TODO change the secret before deployment in production mode
    secret: "saikrishna",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok")
      }
    ),
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(passport.setAuthenticatedUser)

// middleware to parse incoming request bodies.
app.use(express.urlencoded())
// we are going to use express router
app.use("/", require("./routes"))

app.listen(port, function (err) {
  if (err) {
    console.log("error in listening the server: ", err)
    return
  }
  console.log(`UP and Running on port ${port}`)
})
