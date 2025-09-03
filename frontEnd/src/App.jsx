import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { initUser, logOutUser } from './reducers/userReducer'

const App = () => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [showBlogForm,setShowBlogForm] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser())
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(initBlogs())
    }
  }, [user, dispatch])

  if (user === null) {
    return (
      <div>
        <Notification/>
        <h2>Log in to application</h2>
        <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
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
        <button type="button" onClick={() => dispatch(logOutUser())} style={buttonStyle}>Logout</button>
      </div>
      <div>
        {
          showBlogForm
            ?
            <BlogForm setShowBlogForm={setShowBlogForm} setAuthor={setAuthor} setTitle={setTitle} setUrl={setUrl} title={title} author={author} url={url}/>
            :
            <button onClick={() => setShowBlogForm(true)}>Create New Blog</button>
        }
      </div>
      <ul style={{paddingLeft:"0"}} id='blogsList'>
        {blogs.map(blog =>
          <li key={blog.id} style={{listStyle:"none"}}>{<Blog key={blog.id} blog={blog} user={user}/>}</li>
        )}
      </ul>
    </div>
  )
}

export default App