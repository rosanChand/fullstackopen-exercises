const Part = ({parts})=>{
    return <p>{parts.name} {parts.exercises}</p>
  }
  
  const Content = ({parts}) =>{
    return(
    <>
    {/* {console.log('d')} */}
    {parts.map(part => ( <Part key={part.id} parts={part} />))}
    </>
    )
  }
  
  const Header = ({name}) =>{
    return <h1>{name}</h1>
  }

  const Total = ({parts}) => {
    // sum = 0
    return (
        <>
        <b><p>total of {parts.reduce((sum,parts)=>sum + parts.exercises,0)} exercises</p></b>
        </>
    )
  }
  const Course = ({course}) =>{
    return (
      <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      </>
    )
  }

  export default Course