import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogReducer"

const BlogForm = ({setShowBlogForm,setTitle,setAuthor,setUrl,title,url,author,testUser }) => {

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
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

  const submitBlog = (event) => {
    event.preventDefault()
    if (testUser) {
      addBlog({ title, author, url })
      return { title, author, url }
    }
    addBlog(event)
  }

  return (
    <form onSubmit={submitBlog}>
      <div>
          title
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
          author
        <input
          type="author"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
          url
        <input
          type="url"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  )
}

export default BlogForm