import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import { notificationAction } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [showBlogForm,setShowBlogForm] = useState(false)

  const dispatch = useDispatch()

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
        const newBlogs = blogs.map(blog => ({
          ...blog,
          showFull: false
        }))
        newBlogs.sort((a, b) => b.likes - a.likes)
        setBlogs(newBlogs)
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
      dispatch(notificationAction(`Wrong credential`,5))
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
    dispatch(notificationAction(`a new blog ${blogObject.title} by ${blogObject.author} added`,5))

    setBlogs(blogs.concat(response))
    setTitle('')
    setAuthor('')
    setUrl('')
    setShowBlogForm(false)
  }

  if (user === null) {
    return (
      <div>
        <Notification/>
        <h2>Log in to application</h2>
        <Login handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
      </div>
    )
  }

  const loggedInStlye = {
    display: 'flex',
    gap: '5px',
    alignItems: 'center'
  }

  const buttonStyle = {
    height: '25px'
  }

  return (
    <div>
      <Notification/>
      <h2>blogs</h2>
      <div style={loggedInStlye}>
        <h2>Logged in with {user.username}</h2>
        <button type="button" onClick={handleLogOut} style={buttonStyle}>Logout</button>
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
      <ul style={{paddingLeft:"0"}} id='blogsList'>
        {blogs.map(blog =>
          <li key={blog.id} style={{listStyle:"none"}}>{<Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} user={user}/>}</li>
        )}
      </ul>
    </div>
  )
}

export default App