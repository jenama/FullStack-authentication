const express = require('express');
const router = express.Router();
const userQueries  = require('../db/users');
const authHelpers = require('../authentication/helper')
const passport = require('../authentication/passport')

router.post("/signup", async (req, res, next) => {
  try {
    const passwordDigest = await authHelpers.hashPassword(req.body.password)
  
    let user = {
      username: req.body.username,
      password_digest: passwordDigest
    };
   
    
    let registeredUser = await userQueries.createUser(user);
    console.log('registered user')
    res.status(201).json({
      payload: {
        user: registeredUser,
        msg: "User created",
      },
      err: false
    })

  } catch (err) {
    if (err.message === "Username not available. Please try a different one.") {
      res.status(409).json({
        payload: {
          msg: err.message
        },
        err: true
      })
    } else {
      next(err);
    }
  }
})

router.post("/login", passport.authenticate('local'), (req, res, next) => {
  console.log(req.body)
  res.json({
    payload: req.user,
    msg: "The user has been successfully logged in",
    err: false
  })
})

router.get("/logout", (req, res, next) => {
  req.logOut()
  res.json({
    payload: null,
    msg: "The user has been logged out successfully",
    err: false
  })
})

module.exports = router;
