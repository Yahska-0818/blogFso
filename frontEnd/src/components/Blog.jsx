import { useDispatch, useSelector } from 'react-redux'
import { addComment, likeBlog, removeBlog } from '../reducers/blogReducer'
import {useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import {Form, Button, FormControl, ListGroup, ListGroupItem} from 'react-bootstrap'


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
          likes {blog.likes} <Button variant='primary' data-testid="like-button" onClick={() => dispatch(likeBlog(blog))}>like</Button>
        </div>
        <p>added by {blog.author}</p>
        {user.id === blog.user.id || user.id === blog.user ?
          <Button variant='primary' onClick={() => {dispatch(removeBlog(blog)); navigate('/')}} style={{ width:'75px' }}>remove</Button>
          : null
        }
        <h2>Comments</h2>
        <Form onSubmit={(event) => {
          event.preventDefault()
          dispatch(addComment(blog.id,comment))
          setComment('')
        }} style={{ display:'flex',gap:'5px' }}>
          <Form.Group>
            <FormControl
              type="text"
              value={comment}
              name="Comment"
              onChange={({ target }) => setComment(target.value)}
            />
          </Form.Group>
          <Button variant='primary' type="submit">comment</Button>
        </Form>
        <ListGroup id='commentsList'>
          {blog.comments.map(comment =>
            <ListGroupItem variant='primary' key={comment._id || crypto.randomUUID()}>{comment}</ListGroupItem>
          )}
        </ListGroup>
      </>
    )
  } else {
    return (
      <h1>loading</h1>
    )
  }
}

export default Blog