const express = require('express');
const router = express.Router();
const userQueries = require('../db/users')
const { loginRequired } = require('../authentication/helper')

router.get('/', loginRequired, async(req, res, next) => {
  try {
    let users = await userQueries.getAll()
    res.json({
      payload: users,
      msg: "All users were successfully retrieved",
      err: false
    })
  } catch (err) {
    res.status(500).json({
      payload: null,
      msg: "Failed to get all users",
      err: true
    })
  }
  
}) 

router.all('/', (req, res, next) => {
  res.status(405).json({
    payload: "Nah, nah, nah",
    err: true
  })
})

module.exports = router;
