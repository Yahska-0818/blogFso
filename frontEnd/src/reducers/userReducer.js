import { createSlice } from "@reduxjs/toolkit"
import loginService from '../services/login'
import blogService from '../services/blogs'
import { notificationAction } from "./notiReducer"

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser (state,action) {
      return action.payload
    }
  }
})

export const {setUser,signOut} = userSlice.actions

export const handleLogin = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))
      
    } catch (exception) {
      dispatch(notificationAction('Wrong credentials', 5))
    }
  }
}

export const initUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const logOutUser = () => {
  return dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch(setUser(null))
  }
}

export default userSlice.reducer