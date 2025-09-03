import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog, toggleVisibility } from '../reducers/blogReducer'

const Blog = ({ blog,mockLike }) => {

  const user = useSelector(state=>state.user)

  const blogs = useSelector(state=>state.blogs)

  const dispatch = useDispatch()

  const blogListStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const fullStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px'
  }
  const closeStyle = {
    display: 'flex',
    gap: '5px'
  }

  return (
    <div style={blogListStyle} className='blog'>
      {blog.showFull ?
        <div style={fullStyle}>
          <div>
            {blog.title} {blog.author} <button onClick={() => dispatch(toggleVisibility(blog.id))}>Hide</button>
          </div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button data-testid="like-button" onClick={() => dispatch(likeBlog(blog))}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {user.id === blog.user.id || user.id === blog.user ?
            <button onClick={() => dispatch(removeBlog(blog))} style={{ width:'75px' }}>remove</button>
            : null
          }
        </div>
        :
        <div style={closeStyle}>
          {blog.title} {blog.author}
          <button onClick={() => dispatch(toggleVisibility(blog.id))}>View</button>
        </div>
      }
    </div>
  )
}

export default Blog