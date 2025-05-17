import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useQuery,useMutation,useQueryClient} from '@tanstack/react-query'

import { getAll,createNew,update } from './requests'
import {useContext} from 'react'
import NotificationContext from './NotificationContext'

const App = () => {

 
  const queryClient = useQueryClient()
   const {noti,setNotification} = useContext(NotificationContext)
  const newVoteUpdateMutation = useMutation({
    mutationFn: update,
    onSuccess: (changedObj) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'],anecdotes.map(a => a.id === changedObj.id? changedObj: a))
      setNotification(`anecdote '${changedObj.content}' voted`)
    }
  })

  const handleVote = (anecdote) => {
    newVoteUpdateMutation.mutate(anecdote)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: false,
    refetchOnWindowFocus: false
  })
  if(result.isLoading) {
    return <div>loading data...</div>
  }
  if(result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
