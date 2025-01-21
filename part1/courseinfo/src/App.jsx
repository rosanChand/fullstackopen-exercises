
const Header =({courseName})=>{
  return (
   
      <h1>{courseName}</h1>
    
  )
}
const Part = ({part})=>{
  return <p>{part.name} {part.exercises}</p>
}
const Content = ({parts})=>{
  return (
    <>
    <Part part={parts[0]} />
    <Part part={parts[1]} />
    <Part part={parts[2]}/>
  
    </>
  )
  }
const Footer = ({parts})=>{
return <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts : [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        }
      ]
}

return (
  <div>
    <Header courseName={course.name} />
    <Content 
    parts = {course.parts}
    />
    <Footer
    parts = {course.parts}
    />
  </div>
)
}

export default App
