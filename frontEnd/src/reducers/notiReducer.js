import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notiSlice = createSlice({
  name:'notification',
  initialState,
  reducers:{
    setNotification (state,action) {
      return action.payload
    },
    clearNotification () {
      return initialState
    }
  }
})

export const { setNotification,clearNotification } = notiSlice.actions

let timeoutId = null

export const notificationAction = (notification, time) => {
  return dispatch => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    dispatch(setNotification(notification))
    timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, time * 1000)
  }
}

export default notiSlice.reducer