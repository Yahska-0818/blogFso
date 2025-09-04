import BlogForm from './BlogForm'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const [showBlogForm,setShowBlogForm] = useState(false)

  const blogListStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={{display:"flex",flexDirection:"column",gap:"3vh"}}>
      <div>
        {
          showBlogForm
            ?
            <BlogForm setShowBlogForm={setShowBlogForm}/>
            :
            <Button onClick={() => setShowBlogForm(true)}>Create New Blog</Button>
        }
      </div>
      <ListGroup style={{ paddingLeft:'0' }} id='blogsList'>
        {blogs.map(blog =>
          <ListGroupItem variant="primary" key={blog.id} style={blogListStyle}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></ListGroupItem>
        )}
      </ListGroup>
    </div>
  )
}

export default BlogList