import { useEffect } from 'react'
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom'
import Notification from './components/Notification'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/userReducer'
import Users from './components/Users'
import BlogList from './components/BlogList'
import User from './components/User'
import Blog from './components/Blog'
import { Navbar, Nav,Button } from 'react-bootstrap'
import { logOutUser } from './reducers/userReducer'

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
      <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"5vh",backgroundColor:"black",minHeight:"100vh"}}>
        <Notification/>
        <h2 style={{color:"white"}}>Log in to application</h2>
        <Login/>
      </div>
    )
  }

  return (
    <div style={{backgroundColor:"black",minHeight:"100vh",color:"white",display:"flex",flexDirection:"column",gap:"2vh"}}>
      <Notification/>
      <h2 style={{display:"flex",justifyContent:"center"}}>Blogs</h2>
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link style={{ padding:'5px' }} to="/">Blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={{ padding:'5px' }} to="/users">Users</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                {user
                  ? <div>
                      <em style={{ padding:'5px' }}>{user.username} logged in</em>
                      <Button type="button" onClick={() => dispatch(logOutUser())}>Logout</Button>
                    </div>
                  : <Link style={{ padding:'5px' }} to="/login">login</Link>
                }
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
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