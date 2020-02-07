const  db = require('./pgp');
// const authHelpers = require('../authentication/helper');

const createUser = async (user) => {
  // console.log('user from user.js', user)
  try {
    let insertQuery = `INSERT INTO users(username, password_digest) 
                        VALUES($1, $2) 
                        RETURNING id, username`;
    let registeredUser = await db.one(insertQuery, [user.username, user.password_digest])
      console.log('new user', registeredUser)
    return registeredUser;
  } catch (err) {
    // Username already taken 
    if (err.code === "23505" && err.detail.includes("already exists")) {
      throw new Error("Username not available. Please try a different one.");
    }
    throw err;
  }
}

const getUserByUsername = async (username) => {
  try {
    let user = await db.oneOrNone('SELECT * FROM users WHERE username = $/username/', {
      username
    });
    return user;
  } catch (err) {
    if (err instanceof errors.QueryResultError) {
      if (err.code === errors.queryResultErrorCode.noData) {
        return false;
      }
    }
    throw err;
  }
}

const getUserById = async (id) => {
  try {
    let user = await db.one('SELECT * FROM users WHERE id = $1', id);
    return user;
  } catch (err) {
    throw err;
  }
}

const awardPoints = async (userId, points) => {
  try {
    let updateQuery = `UPDATE users SET points = points + $/points/ 
    WHERE id = $/userId/ RETURNING *`

    let user = await db.one(updateQuery, {
      userId,
      points
    })
    return user;
  } catch (err) {
    throw err;
  }
}

const getAll = async () => {
  try {
    let users = await db.any('SELECT * FROM users');
    return users;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  awardPoints,
  getAll
}
