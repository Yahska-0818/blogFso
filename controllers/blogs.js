const blogsRouter = require('express').Router()
const { findById } = require('../../notes-backend/models/note')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json((blogs))
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  if (!(blog.likes)) {
    blog.likes = 0
  } 
  
  if (!(blog.title) || !(blog.url)) {
    return response.status(400).end()
  }
  
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request,response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request,response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(404).end()
  }

  blog.likes = request.body.likes

  const updatedBlog = await blog.save()
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter