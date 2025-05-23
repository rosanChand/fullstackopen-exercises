// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

// const reducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   switch(action.type){
//     case 'VOTE': {
//       const id = action.payload.id
//       const anecdoteToUpdate = state.find(a => a.id === id)
//       const changedAnecdote = {
//         ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1
//       }

//       return state.map(a => a.id == id?changedAnecdote:a)
//     }
//     case 'NEW_ANEC':
//       return state.concat(action.payload)
//     default:
//       return state

//   }
// }

// export const addVote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: {id}
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type:'NEW_ANEC',
//     payload: {
//       content,
//       id: getId(),
//       votes: 0   
//     }
//   }
// }

// export default reducer

import {createSlice} from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState :[],
  reducers: {
    updateVote(state,action) {
      // const id = action.payload
      // const anecdoteToUpdate = state.find(a => a.id === id)
      // const changedAnecdote = {
      //   ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1
      // }
      return state.map(a => a.id == action.payload.id?action.payload:a)
    },
    appendAnecdote(state,action){
      state.push(action.payload)
    },
   
    setAnecdotes(state,action) {
      return action.payload
    }
  }
})
export const {updateVote,setAnecdotes,appendAnecdote} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}
export const addVote = obj => {
  return async dispatch => {
    const changedObject = await anecdoteService.update(obj)
    dispatch(updateVote(changedObject))
  }
}

export default anecdoteSlice.reducer