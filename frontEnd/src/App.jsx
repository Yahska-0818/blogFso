import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Login from './components/Login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState(null)
  const [showBlogForm,setShowBlogForm] = useState(false)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs => {
        setBlogs(blogs)
      })
    }
  }, [user])
  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Wrong credentials')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogOut = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async (event) => {
      event.preventDefault()
      const blogObject = {
        title: title,
        author: author,
        url: url
      }

      const response  = await blogService.create(blogObject)
      setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)

      setBlogs(blogs.concat(response))
      setTitle('')
      setAuthor('')
      setUrl('')
      setShowBlogForm(false)
    }

  if (user === null) {
    return (
      <div>
        <Notification message={notification} />
        <h2>Log in to application</h2>
        <Login handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
      </div>
    )
  }

  return (
    <div>
      <Notification message={notification} />
      <h2>blogs</h2>
      <div>
        <h2>Logged in with {user.username}</h2>
        <button type="button" onClick={handleLogOut}>Logout</button>
      </div>
      <div>
        {
          showBlogForm 
          ? 
          <BlogForm addBlog={addBlog} setAuthor={setAuthor} setTitle={setTitle} setUrl={setUrl} title={title} author={author} url={url}/> 
          : 
          <button onClick={() => setShowBlogForm(true)}>Create New Blog</button>
        }
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App