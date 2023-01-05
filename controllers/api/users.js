// /controllers/api/users.js

// handles call to our api which is hosted on the path api/users
const User = require('../../models/user')
// jwt library will generate the token needed for authentication
const jwt = require('jsonwebtoken')
// bcrypt hashes/encrypts our password in the database using our secret key
const bcrypt = require('bcrypt')

// function that checks authentication token to see if you're logged in
const checkToken = (req, res) => {
  console.log('req.user', req.user)
  res.json(req.exp)
}

// creates user in database
const dataController = {
  async create (req, res, next) {
    try {
      // uses user model to create a new user
      const user = await User.create(req.body)
      // create a JWT when signing up
      const token = createJWT(user)
      // send back the token as a string
      // which we need to account for
      // in the client
      res.locals.data.user = user
      res.locals.data.token = token
      next()
    } catch (e) {
      res.status(400).json(e)
    }
  },
  async login (req, res, next) {
    try {
      const user = await User.findOne({ email: req.body.email })
      if (!user) throw new Error()
      const match = await bcrypt.compare(req.body.password, user.password)
      if (!match) throw new Error()
      res.locals.data.user = user
      res.locals.data.token = createJWT(user)
      next()
    } catch {
      res.status(400).json('Bad Credentials')
    }
  }
}

const apiController = {
  auth (req, res) {
    res.json(res.locals.data.token)
  }
}

module.exports = {
  checkToken,
  dataController,
  apiController
}

/* -- Helper Functions -- */

function createJWT (user) {
  // creates jwt using the jwt library. 
  return jwt.sign(
    // token is created for the user who signs in
    { user },
    // helps encrypt user token with our secret
    process.env.SECRET,
    // user can stay logged in for 24 hours
    { expiresIn: '24h' }
  )
}