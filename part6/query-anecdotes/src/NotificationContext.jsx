import {createContext, useReducer,useRef} from 'react'

const notificationReducer = (state = '',action) => {
    switch (action.type){
        case "add":
            return action.payload
        case "remove":
            return ''
        default:
            return state
    }
} 

const NotificationContext = createContext()



export const NotificationContextProvider = (props) => {
    const [noti, NotificationDispatch] = useReducer(notificationReducer,'')

    const timeoutId = useRef(null)
    const setNotification = (message,duration = 5) => {
        if (timeoutId.current){
            clearTimeout(timeoutId)
        }
        NotificationDispatch({type:'add',payload:message})

        timeoutId.current = setTimeout(() => {
            NotificationDispatch({type: 'remove'})
           timeoutId.current = null
        },duration * 1000)
    }
    return (<NotificationContext.Provider value={{noti,setNotification}}>
        {props.children}
    </NotificationContext.Provider>)
}






export default NotificationContext