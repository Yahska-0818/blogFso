const blogsRouter = require('express').Router()
const { request } = require('express')
const Blog = require('../models/blog')
const blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 , id: 1})
  response.json((blogs))
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 , id: 1})
  response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  const user = request.user

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

blogsRouter.post('/:id/comments', async (request,response) => {
  const {content} = request.body

  if (!content) {
    return response.status(400).json({error:"No content in comment"})
  }

  const blogToComment = await Blog.findById(request.params.id)

  if (!blogToComment) {
    return response.status(404).json({error:"Blog not found"})
  }

  blogToComment.comments = blogToComment.comments.concat(content)

  const updatedBlog = await blogToComment.save()

  return response.status(201).json(updatedBlog)
})

blogsRouter.delete('/:id', async (request,response) => {
  const blogTodelete = await Blog.findById(request.params.id)
  const user = request.user

  if (user._id.toString()==blogTodelete.user.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  }
  return response.status(404).end()
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