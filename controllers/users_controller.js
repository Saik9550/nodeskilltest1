const User = require("../models/userlogin")

// render the sign up page
module.exports.signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/")
  }

  return res.render("userSignup", {
    title: "Sign Up",
  })
}

// render the sign in page
module.exports.signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect("/")
  }
  return res.render("userSignIn", {
    title: " Sign In",
  })
}

// get the sign up data
module.exports.create = async function (req, res) {
  try {
    if (req.body.password != req.body.confirm_password) {
      req.flash("error", "Passwords do not match")
      return res.redirect("back")
    }

    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      const newUser = await User.create(req.body)
      req.flash("success", "You have signed up, login to continue!")
      return res.redirect("/users/sign-in")
    } else {
      req.flash("success", "You are already registered, login to continue!")
      return res.redirect("back")
    }
  } catch (err) {
    req.flash("error", err.message)
    return res.redirect("back")
  }
}

// sign in and create a session for the user
module.exports.createSession = function (req, res) {
  req.flash("success", "Logged in Successfully")
  return res.redirect("/")
}

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log("ERROR", err)
      return
    }
    req.flash("success", "You have logged out!")
    res.redirect("/")
  })

  return res.redirect("/")
}
