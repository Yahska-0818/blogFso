import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { useNavigate, useParams } from 'react-router-dom'


const Blog = () => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find(blog=>blog.id===id)
  const navigate = useNavigate()
  if (blog) {
    return (
      <>
        <h1>{blog.title}</h1>
        <a href={blog.url} target='#'>{blog.url}</a>
        <div>
          likes {blog.likes} <button data-testid="like-button" onClick={() => dispatch(likeBlog(blog))}>like</button>
        </div>
        <p>added by {blog.author}</p>
        {user.id === blog.user.id || user.id === blog.user ?
          <button onClick={() => {dispatch(removeBlog(blog)); navigate('/')}} style={{ width:'75px' }}>remove</button>
          : null
        }
      </>
    )
  } else {
    return (
      <h1>loading</h1>
    )
  }
}

export default Blog