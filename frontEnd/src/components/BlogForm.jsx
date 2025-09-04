import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ setShowBlogForm,setTitle,setAuthor,setUrl,title,url,author,testUser }) => {

  const dispatch = useDispatch()

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