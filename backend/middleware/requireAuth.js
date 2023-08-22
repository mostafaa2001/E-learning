
const jwt = require('jsonwebtoken')
const Indiv = require('../models/individualTrainee')

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  
  // console.log(!req.headers)
  const { cookie } = req.headers

  // console.log(authorization)
  // console.log(req.headers)

  if (!cookie) {
    return res.status(401).json({error: 'Authorization token required'})
  }

  const token = cookie.split('=')[1]
  console.log(token)
  try {
    const { _id } = jwt.verify(token, process.env.SECRET)
    console.log("ID:   " +_id)
    req.user = await Indiv.findOne({ _id }).select('_id')
    next()
    

  } catch (error) {
    console.log(error)
    res.status(401).json({error: 'Request is not authorized'})
  }
}

module.exports = requireAuth