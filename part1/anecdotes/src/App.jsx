import { useState } from 'react'


const Mostvote = ({vote,anecdotes}) => {
    let max = 0;
    for(let key in vote){
        if(vote[key] > vote[max]){
          max = key
        }
    }
    // console.log(typeof max)
  if (vote[max] === 0){
    return '';
  }else{
     return <p>{anecdotes[max]}</p>
     
  }
}

const App = () => {
  const [selected, setSelected] = useState(0)
  const [vote,setVote] = useState({0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0})
  const anecdotes = [
    "I think it's a new feature. Don't tell anyone it was an accident.",
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

 
  function selectRandom(){
    let randomNumber = Math.floor(Math.random() * anecdotes.length) 
    setSelected(randomNumber)
  }
  const handleVote = (item) => {
    {
      const copy = {...vote}
    copy[item] +=1
      setVote(copy)
  }
  }
  return (
    <>
    <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>

      <button onClick={() => handleVote(selected)}>vote</button>
      <button onClick={selectRandom}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <Mostvote vote={vote} anecdotes={anecdotes}/>
    </>
  )
}

export default App
