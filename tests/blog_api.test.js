const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

let token

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const testUser = {
    username: 'testuser',
    name: 'Test User',
    password: 'testUser'
  }

  await api.post('/api/users').send(testUser)

  const loginResponse = await api
    .post('/api/login')
    .send({ username: testUser.username, password: testUser.password })

  token = loginResponse.body.token

  const blog1 = new Blog({ ...helper.initialBlogs[0], user: loginResponse.body.id })
  const blog2 = new Blog({ ...helper.initialBlogs[1], user: loginResponse.body.id })
  await blog1.save()
  await blog2.save()
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs').set('Authorization',`Bearer ${token}`)
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('a blog title is within the returned blogs', async () => {
  const response = await api.get('/api/blogs').set('Authorization',`Bearer ${token}`)

  const titles = response.body.map(e => e.title)
  assert(titles.includes('React patterns'))
})

test('unique identifier is returned as id', async () => {
  const response = await api.get('/api/blogs').set('Authorization',`Bearer ${token}`)

  const titles = response.body
  const keys = Object.keys(titles[0]) 
  assert(keys.includes('id'))
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .set('Authorization',`Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  assert.strictEqual(blogs.length,helper.initialBlogs.length+1)
  const titles = blogs.map(r => r.title)
  assert(titles.includes('Canonical string reduction'))
})

test('blog without likes defaults to 0 likes', async () => {
  const newBlog = {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    __v: 0
  }

  await api
    .post('/api/blogs')
    .set('Authorization',`Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  const likes = blogs.map(r => r.likes)
  assert.strictEqual(likes[likes.length-1],0)
})

test('blog without title or url does not get added', async () => {
  const newBlog = {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    __v: 0
  }

  await api
    .post('/api/blogs')
    .set('Authorization',`Bearer ${token}`)
    .send(newBlog)
    .expect(400)

  const blogs = await helper.blogsInDb()
  assert.strictEqual(blogs.length, helper.initialBlogs.length)
})

test('blogs can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).set('Authorization',`Bearer ${token}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const titles = blogsAtEnd.map(n => n.title)
  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
})

test('blog likes are updated', async () => {
  const newLikes = {"likes":21}
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .set('Authorization',`Bearer ${token}`)
    .send(newLikes)
    .expect(200)
    .expect('Content-Type', /application\/json/);
  
  const blogsAtEnd = await helper.blogsInDb()

  const likes = blogsAtEnd.map(n => n.likes)
  
  assert.strictEqual(likes[0],newLikes.likes)
  
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .set('Authorization',`Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


after(async () => {
  await mongoose.connection.close()
})