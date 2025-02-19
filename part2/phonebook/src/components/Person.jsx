const Person = ({persons,searchName})=>{
    if (searchName){
        return persons.map(person => {
          if (person.name.toLowerCase().includes(searchName.toLowerCase())){
            return (
            <div key= {person.name}>
            {person.name} {person.number}
            </div>)
          }
        }
      )}  else 
       return (
        persons.map(person =><div key={person.name}>{person.name} {person.number}</div>)
       )
}

export default Person