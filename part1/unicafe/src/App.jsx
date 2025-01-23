
import { useState } from "react";


const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const StatisticLine = ({text,value}) => <tr><td>{text}</td><td>{value}</td></tr>;

const Statistics = ({good,neutral,bad,total})=>{
    
   if (!good & !neutral & !bad & !total){
    return <p>No feedback given</p>
   }
   else{
    const total = good+neutral+bad;
    const average = (good*1+neutral*0+bad*-1)/total;
    const positive = (good/total)*100;

    return (
      <>
      <table>
        <tbody>
       <StatisticLine text='good' value={good}/>
       <StatisticLine text='neutral' value={neutral}/>
       <StatisticLine text='bad' value={bad}/>
       <StatisticLine text='all' value={total}/>
       <StatisticLine text='average' value={average}/>
       <StatisticLine text='positive' value={positive}/>
       </tbody>
       </table>
      </>
    )
  }
}
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
      <Statistics good={good} bad={bad} neutral={neutral} />  
    </>
  )
}

export default App

