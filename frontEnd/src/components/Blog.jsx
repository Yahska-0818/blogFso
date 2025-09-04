import { useDispatch, useSelector } from 'react-redux'
import { addComment, likeBlog, removeBlog } from '../reducers/blogReducer'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'


const Blog = () => {
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = blogs.find(blog => blog.id===id)
  const navigate = useNavigate()

  const [comment,setComment] = useState('')


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
        <h2>comments</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          dispatch(addComment(blog.id,comment))
          setComment('')
        }} style={{ display:'flex',gap:'5px' }}>
          <div>
            <input
              type="text"
              value={comment}
              name="Comment"
              onChange={({ target }) => setComment(target.value)}
            />
          </div>
          <button type="submit">comment</button>
        </form>
        <ul id='commentsList'>
          {blog.comments.map(comment =>
            <li key={comment._id || crypto.randomUUID()}>{comment}</li>
          )}
        </ul>
      </>
    )
  } else {
    return (
      <h1>loading</h1>
    )
  }
}

export default Blog