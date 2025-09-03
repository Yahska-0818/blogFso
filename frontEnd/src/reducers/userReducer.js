import { createSlice } from "@reduxjs/toolkit"
import loginService from '../services/login'
import blogService from '../services/blogs'

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

export const handleLogin = (username,password) => {
  return async dispatch => {
    const user = await loginService.login({username,password})
    if (user) {
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(setUser(user))
    } else {
      dispatch(notificationAction(`Wrong credential`,5))
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