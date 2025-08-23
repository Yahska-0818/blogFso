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
  
  return (
    <div style={blogListStyle}>
      {blog.showFull ?
      <div style={fullStyle}>
        <div>
          {blog.title} <button onClick={() => changeStyle(blog.id)}>Hide</button>
        </div>
        {blog.url}
        <div>
          likes {blog.likes} <button>like</button>
        </div>
        {blog.author}
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