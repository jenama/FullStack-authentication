let express = require('express');
let router = express.Router();
let { Users } = require('../db');
let authHelper = require('../authentication/helper')

router.post("/signup", async (req, res, next) => {
  const { username } = req.body;

  try {
    const passwordSerie = await authHelper.hashPassword(req.body.password)
    let user = {
      username,
      password_serie: passwordSerie
    };

    let registeredUser = await Users.createUser(user);

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

module.exports = router;
