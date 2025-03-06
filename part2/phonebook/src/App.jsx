import { use, useState,useEffect } from "react";
import Person from "./components/Person";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import phonebook from "./services/phonebook";
import Notification from "./components/Notification"
const App = ()=>{
    const [persons,setPersons] = useState([])

    useEffect(()=>{
      phonebook.getAll()
      .then((initialNotes)=>{
        setPersons(initialNotes)
        console.log(initialNotes)
      })
    },[])
const [newName,setNewName] = useState('')

const [newNumber,setNewNumber] = useState('')
const [searchName,setSearchName] = useState('')
const [errorMessage,setErrorMessage] = useState(null)

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
  const obj = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
  if (obj){
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      
      const ChangedObj = {...obj,number: newNumber}
      phonebook.update(ChangedObj.id,ChangedObj).then((returnedNumber) => {
        setErrorMessage(`${obj.name} phone number was changed to ${newNumber}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
        setPersons(persons.map(person=> person.id == ChangedObj.id?returnedNumber:person))
    }).catch(error => {
      if(error.name === 'ValidationError'){
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      } else {
      setErrorMessage(`Information of ${obj.name} was previously deleted.`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    });
  }
    return
  }

  const name = {
    name: newName,
    number: newNumber
  }
  phonebook.create(name)
  .then(data => {
  setPersons(persons.concat(data))
  setErrorMessage(`Added ${newName}`)
  setTimeout(() => {
    setErrorMessage(null)
  }, 5000)
  setNewName('')
  setNewNumber('')
  })
  .catch(error => {
    setErrorMessage(error.response.data.error)
  setTimeout(() => {
    setErrorMessage(null)
  }, 5000)
  })
}
const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this person?")) {
    
    
    phonebook.remove(id).then(() => {
      const test = persons.find(person => person.id == id)
      setErrorMessage(`Deleted ${test.name}`)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
      setPersons(persons.filter(person => person.id !== id));
    })
  }
};






return (
  <>
    <h2>Phonebook</h2>
    <Notification message={errorMessage} />
    <Filter searchName={searchName} handleSearch={handleSearch}/>
    <PersonForm 
        addNote={addNote}
        handleNewName={handleNewName}
        handleNewNumber={handleNewNumber}
        newName={newName}
        newNumber={newNumber}
      />
    <h2>Numbers</h2>
    <Person persons={persons} searchName={searchName} handleDelete={handleDelete}/>
  </>
)
}
export default App