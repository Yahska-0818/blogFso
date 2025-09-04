import { useEffect } from 'react'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'
import Notification from './components/Notification'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/userReducer'
import Header from './components/Header'
import Users from './components/Users'
import BlogList from './components/BlogList'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initUser())
  }, [dispatch])

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
        <Login/>
      </div>
    )
  }

  return (
    <div>
      <Notification/>
      <h2>blogs</h2>
      <Router>
        <Link style={{ padding:'5px' }} to="/">blogs</Link>
        <Link style={{ padding:'5px' }} to="/users">users</Link>
        <Header />
        <Routes>
          <Route path='/users' element={<Users/>}></Route>
          <Route path='/' element={<BlogList/>}></Route>
          <Route path='/users/:id' element={<User/>}></Route>
          <Route path='/blogs/:id' element={<Blog/>}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App