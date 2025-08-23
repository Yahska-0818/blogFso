import axios from 'axios'
import blogService from '../services/blogs'

const Blog = ({ blog,setBlogs,blogs }) => {

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

  const changeStyle = (id) => {
    const changedBlogs = blogs.map(blog => {
      if (blog.id === id) {
        return { ...blog, showFull: !blog.showFull }
      }
      return blog
    })
    setBlogs(changedBlogs)
  }
  
  const addLike = async (blog) => {
    blog.likes++
    const updatedBlog = await blogService.addLike(blog)
    const changedBlogs = blogs.map(blog => {
      if (blog.id === updatedBlog.id) {
        return { ...blog, likes:updatedBlog.likes }
      }
      return blog
    })
    changedBlogs.sort((a, b) => b.likes - a.likes)
    setBlogs(changedBlogs)
  }

  const removeBlog = async (blog) => {
    const id = blog.id
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(id)
      const changedBlogs = blogs.filter(blog => blog.id !== id)
      changedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(changedBlogs)
    }
  }

  return (
    <div style={blogListStyle}>
      {blog.showFull ?
      <div style={fullStyle}>
        <div>
          {blog.title} <button onClick={() => changeStyle(blog.id)}>Hide</button>
        </div>
        {blog.url}
        <div>
          likes {blog.likes} <button onClick={() => addLike(blog)}>like</button>
        </div>
        {blog.author}
        <button onClick={() => removeBlog(blog)} style={{width:"75px"}}>remove</button>
      </div>
      :
      <div style={closeStyle}>
        {blog.title}
        <button onClick={() => changeStyle(blog.id)}>View</button>
      </div> }
    </div>
  )
}

export default Blog