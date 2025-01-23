
import { useState } from "react";


const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const App = () =>{
  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad,setBad] = useState(0) 
  
  return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick={()=>{setGood(good + 1)}} text='Good'></Button>
      <Button onClick={()=>{setNeutral(neutral + 1)}} text='Neutral'></Button>
      <Button onClick={()=>{setBad(bad + 1)}} text='Bad'></Button>

      <h2>Statistics</h2>

      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
    </>
  )
}

export default App

