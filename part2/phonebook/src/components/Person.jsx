const Person = ({ persons, searchName, handleDelete }) => {
  const filteredPersons = searchName
    ? persons.filter(person =>
        person.name.toLowerCase().includes(searchName.toLowerCase())
      )
    : persons;

  return (
    <>
      {filteredPersons.map(person => (
        <div key={person.id}>
          {person.name} {person.number} 
          <button onClick={() => handleDelete(person.id)}>delete</button>
        </div>
      ))}
    </>
  );
};

export default Person;
