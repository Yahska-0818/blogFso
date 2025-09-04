import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useState } from 'react'
import {Form, Button} from 'react-bootstrap'

const BlogForm = ({ setShowBlogForm,testUser }) => {

  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submitBlog = (event) => {
    event.preventDefault()
    if (testUser) {
      return { title, author, url }
    }
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    dispatch(createBlog(blogObject))
    setTitle('')
    setAuthor('')
    setUrl('')
    setShowBlogForm(false)
  }

  return (
    <Form onSubmit={submitBlog} style={{display:'flex',flexDirection:"column",gap:"2vh",alignItems:'center'}}>
      <Form.Group>
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Author:</Form.Label>
        <Form.Control
          type="author"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Url:</Form.Label>
        <Form.Control
          type="url"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">Save</Button>
    </Form>
  )
}

export default BlogForm