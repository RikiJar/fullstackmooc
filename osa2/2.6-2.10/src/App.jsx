import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      number: newNumber
    };

    setPersons(persons.concat(personObject));
    setNewName('');
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const nameInput = () => {
    return (
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
    );
  }

  const numberInputButton = () => {
    return (
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
    );
  }

  const filterButton = () => {
    return (
      <div>
        filter shown with: <input value={newFilter} onChange={handleFilterChange} />
      </div>
    );
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {filterButton()}
      <h1>Add new person</h1>
      <form onSubmit={handleSubmit}>
        {nameInput()}
        {numberInputButton()}
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons
      .filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
      .map((person, index) => (
        <div key={index}>
          {person.name + " "} 
          {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;