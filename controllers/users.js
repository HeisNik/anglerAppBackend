const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response) => {
  const { username, firstname, lastname, email, password } = request.body

  if (!password || password.length < 3) {
    return response.status(400).json({ error: 'password missing or too short' })
  }

  if (!email || email.length < 5) {
    return response.status(400).json({ error: 'email missing or too short' })
  }

  console.log('tänne tullaan')

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    firstname,
    lastname,
    email,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('stories')
  response.json(users)
})


module.exports = userRouter