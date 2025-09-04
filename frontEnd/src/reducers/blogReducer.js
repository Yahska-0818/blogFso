import { createSlice } from '@reduxjs/toolkit'
import BlogService from '../services/blogs'
import { notificationAction } from './notiReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      ).sort((a, b) => b.likes - a.likes)
    },
    filterAfterDelete(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
  }
})

export const { setBlogs, appendBlog, updateBlog, filterAfterDelete } = blogSlice.actions

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await BlogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await BlogService.create(content)
    dispatch(notificationAction(`You created ${newBlog.title} by ${newBlog.author}`, 10))
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const updatedBlog = await BlogService.addLike(changedBlog)
    dispatch(updateBlog(updatedBlog))
    dispatch(notificationAction(`You liked ${updatedBlog.title}`, 5))
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await BlogService.remove(blog.id)
      dispatch(filterAfterDelete(blog.id))
      dispatch(notificationAction(`You removed ${blog.title}`, 5))
    }
  }
}

export const addComment = (id,comment) => {
  return async dispatch => {
    const updatedBlog = await BlogService.commentBlog(id,comment)
    dispatch(updateBlog(updatedBlog))
    dispatch(notificationAction(`You comment ${comment} on ${updatedBlog.title}`, 5))
  }
}

export default blogSlice.reducer