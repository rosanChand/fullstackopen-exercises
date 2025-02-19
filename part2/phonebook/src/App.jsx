import { use, useState } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
const App = ()=>{
    const [persons,setPersons] = useState([
      {name: 'Arto Hellas',
        number: '0123456'
      }
    ])
const [newName,setNewName] = useState('')

const [newNumber,setNewNumber] = useState('')
const [searchName,setSearchName] = useState('')

const handleNewName = (event) =>{
    setNewName(event.target.value)
}
// const chechName = ()=>{
//   persons.
// }
const handleSearch= (event)=>{
  setSearchName(event.target.value)
}
const handleNewNumber = (event)=>{
    setNewNumber(event.target.value)
}
const addNote = (event) =>{
  event.preventDefault()
  if (persons.some(person => person.name === newName)){
    alert(`${newName} is already added to phonebook`)
    return
  }

  const name = {
    name: newName,
    number: newNumber
  }
  setPersons(persons.concat(name))

  setNewName('')
  setNewNumber('')

}




return (
  <>
    <h2>Phonebook</h2>
    <Filter searchName={searchName} handleSearch={handleSearch}/>
    <PersonForm 
        addNote={addNote}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
    <h2>Numbers</h2>
    <Person persons={persons} searchName={searchName}/>
  </>
)
}
export default App