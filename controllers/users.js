const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10

  if (password) {
    if (password.length < 3) {
      return response.status(400).send({
        error: 'Password length invalid',
        message: 'Password is shorter than minimum allowed length (3)',
      })
    }
  } else {
    return response.status(400).send({
      error: 'Password is required',
      message: 'Password must be given',
    });
  }

  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1 , author: 1, id: 1})
  response.json(users)
})

usersRouter.get('/:id', async (request,response) => {
  const user = await User.findById(request.params.id).populate('blogs', { url: 1, title: 1 , author: 1, id: 1})
  response.json(user)
})

module.exports = usersRouter