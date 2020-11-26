require('dotenv').config()
const jwt = require('jsonwebtoken')
const db = require('../models/index');

const auth = async(req, res, next) => {
  if (!req.header('Authorization')) {
    res.status(401).send({ error: 'You dont authorized to access this resource' })
  }
  const token = req.header('Authorization').replace('Bearer ', '')
  const data = jwt.verify(token, process.env.JWT_SECRET)
  try {
    const user = await db.User.findByPk(data.id)
    console
    if (!user) {
      throw new Error()
    }
    req.user = user
    req.token = token
    next()
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource' })
  }
}
module.exports = auth
