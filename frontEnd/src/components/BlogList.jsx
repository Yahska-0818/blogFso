import BlogForm from './BlogForm'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [showBlogForm,setShowBlogForm] = useState(false)

  const blogListStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
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
          <li key={blog.id} style={blogListStyle}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
        )}
      </ul>
    </div>
  )
}

export default BlogList