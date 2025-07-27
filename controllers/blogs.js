const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 , id: 1})
  response.json((blogs))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.user)

  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  if (!(blog.likes)) {
    blog.likes = 0
  } 
  
  if (!(blog.title) || !(blog.url)) {
    return response.status(400).end()
  }
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request,response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request,response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 , id: 1})
  if (!blog) {
    return response.status(404).end()
  }

  blog.likes = request.body.likes

  const updatedBlog = await blog.save()
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter