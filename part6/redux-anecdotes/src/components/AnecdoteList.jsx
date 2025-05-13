import {useSelector,useDispatch} from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import Notification from './Notification'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const anecdotes = useSelector(({filter,anecdotes}) => {
        if(filter === ''){
            return anecdotes
        }
        return (anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase())))
    })
    const dispatch = useDispatch()

    const vote = async(anecdote) => {
    dispatch(addVote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`))
  }

    return (
        <>
        <h2>Anecdotes</h2>
        {<Notification/>}
      {anecdotes.slice().sort((a,b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
        </>
    )
}

export default AnecdoteList