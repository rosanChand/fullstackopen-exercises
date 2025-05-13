
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import {useEffect} from 'react'
import anecdoteService from './services/anecdotes'
import { setNotes } from './reducers/anecdoteReducer'
import {useDispatch} from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  useEffect(()=> {
    anecdoteService.getAll().then(a => dispatch(setNotes(a)))
  },[])
  
  return (
    <div>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App