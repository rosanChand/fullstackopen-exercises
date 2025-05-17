
import {useMutation,useQueryClient} from '@tanstack/react-query'
import { createNew } from '../requests'
import {useContext} from 'react'
import NotificationContext from '../NotificationContext'
const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const {noti,setNotification} = useContext(NotificationContext)
  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'],anecdotes.concat(newAnecdote))
      setNotification(`anecdote '${newAnecdote.content}' created`)
    },
    onError: (error) => {
      setNotification(`anecdote creation failed: ${error.message}`)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content,votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
