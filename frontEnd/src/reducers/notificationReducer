import { createSlice } from "@reduxjs/toolkit";

const initialState = 'Notifications will appear here'

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

export const {setNotification,clearNotification} = notiSlice.actions

export const notificationAction = (notification,time) => {
  return dispatch => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, time*1000)
  }
}

export default notiSlice.reducer