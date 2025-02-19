const PersonForm = ({ addNote, handleNewName, handleNewNumber, newName, newNumber }) =>{
   return ( <form onSubmit={addNote}>
    <div>
      name: <input value={newName} onChange={handleNewName}/>
    </div>
    <div>number: <input value={newNumber} onChange={handleNewNumber} /></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default PersonForm