
const Header =({courseName})=>{
  return (
   
      <h1>{courseName}</h1>
    
  )
}
const Content = ({p1,e1,p2,e2,p3,e3})=>{
return (
  <>
  <p>{p1} {e1}</p>
  <p>{p2} {e2}</p>
  <p>{p3} {e3}</p>

  </>
)
}
const Footer = ({e1,e2,e3})=>{
return <p>Number of exercises {e1 + e2 + e3}</p>
}

const App = () => {
const course = 'Half Stack application development'
const part1 = 'Fundamentals of React'
const exercises1 = 10
const part2 = 'Using props to pass data'
const exercises2 = 7
const part3 = 'State of a component'
const exercises3 = 14

return (
  <div>
    <Header courseName={course} />
    <Content 
    p1={part1}
    e1={exercises1}
    p2={part2}
    e2={exercises2}
    p3={part3}
    e3={exercises3}
    />
    <Footer
    e1 = {exercises1}
    e2={exercises2}
    e3={exercises3}
    />
  </div>
)
}

export default App
