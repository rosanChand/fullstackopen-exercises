
import {useDispatch} from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnec = async(event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      // dispatch(createAnecdote(content))
      const newAnecdote = await anecdoteService.createNew(content)
      dispatch(createAnecdote(newAnecdote))
      dispatch(setNotification(`you created '${content}'`))

  }

    return (
        <>
        <h2>create new</h2>
      <form onSubmit={addAnec}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
      </>
    )
}
export default AnecdoteForm
