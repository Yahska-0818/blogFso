const BlogForm = ({ addBlog,setTitle,setAuthor,setUrl,title,url,author }) => (
  <form onSubmit={addBlog}>
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

export default BlogForm