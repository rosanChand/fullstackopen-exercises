const Part = ({parts})=>{
    return <p>{parts.name} {parts.exercises}</p>
  }
  
  const Content = ({parts}) =>{
    return(
    <>
    {console.log('dsjkng')}
    {parts.map(part => ( <Part key={part.id} parts={part} />))}
    </>
    )
  }
  
  const Header = ({name}) =>{
    return <h1>{name}</h1>
  }
  const Course = ({course}) =>{
    return (
      <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      </>
    )
  }

  export default Course