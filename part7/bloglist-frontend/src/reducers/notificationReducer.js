import {createSlice} from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name:'notification',
  initialState,
  reducers: {
    showNotification(state,action){
      return action.payload
    },
    clearNotification(state,action){
      return ''
    }

  }})

  export const {showNotification,clearNotification} = notificationSlice.actions
  
  let timeoutId = null
  export const setNotification = (message, duration = 5) => {
    return async dispatch => {
      if(timeoutId){
        clearTimeout(timeoutId)
      }
      dispatch(showNotification(message))
      timeoutId = setTimeout(() => {
        dispatch(clearNotification())
        timeoutId = null
      },duration * 1000)
    }
  } 
  export default notificationSlice.reducer