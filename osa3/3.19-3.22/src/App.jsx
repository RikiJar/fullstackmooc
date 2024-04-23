import React, { useEffect, useState } from 'react';
import personApi from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [successNotification, setSuccessNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);

  useEffect(() => {
    personApi.getAll().then(response => {
      setPersons(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const person = persons.find(person => person.name === newName);
        const changedPerson = { ...person, number: newNumber };
        setPersons(prevPersons =>
          prevPersons.map(p => p.id !== person.id ? p : changedPerson)
        );
        personApi.update(person.id, changedPerson)
          .then(response => {
            setPersons(persons.map(p => p.id !== person.id ? p : response.data));
            setSuccessNotification(`Updated ${newName}'s number`);
            setTimeout(() => {
              setSuccessNotification(null);
            }, 3000);
          })
          .catch(error => {
            console.log(error.response.status)
            if(error.response.status === 404) {
              console.log("moro")
              setErrorNotification(`Information of ${newName} has already been removed from the server`);
              setTimeout(() => {
                setErrorNotification(null);
              }, 3000);
              return;
            }
            setErrorNotification(`Failed to update ${newName}'s number`);
            setTimeout(() => {
              setErrorNotification(null);
            }, 3000);
          });
        return;
      }
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1).toString()
    };

    personApi.create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data));
        setSuccessNotification(`Added ${newName} to phonebook`);
        setTimeout(() => {
          setSuccessNotification(null);
        }, 3000);
      })
      .catch(error => {
        if(error.response.status === 400) {
          setErrorNotification(error.response.data.error);
          setTimeout(() => {
            setErrorNotification(null);
          }, 3000);
          return;
        }
        setErrorNotification(`Failed to add ${newName} to phonebook`);
        setTimeout(() => {
          setErrorNotification(null);
        }, 3000);
      });

    setNewName('');
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleRemove = (id) => {
    const person = persons.find(person => person.id === id);
    if (window.confirm(`Delete ${person.name}`)) {
      personApi.remove(id)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id));
          setSuccessNotification(`Deleted ${person.name} from phonebook`);
          setTimeout(() => {
            setSuccessNotification(null);
          }, 3000);
        })
        .catch(error => {
          if(error.response.status === 404) {
            setErrorNotification(`Information of ${newName} has already been removed from the server`);
          }
          setErrorNotification(`Failed to delete ${person.name} from phonebook`);
          setTimeout(() => {
            setErrorNotification(null);
          }, 3000);
        });
    }
  };

  const nameInput = () => {
    return (
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
    );
  };

  const numberInputButton = () => {
    return (
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
    );
  };

  const filterButton = () => {
    return (
      <div>
        filter shown with: <input value={newFilter} onChange={handleFilterChange} />
      </div>
    );
  };

  return (
    <div>
      {successNotification && <div style={{ backgroundColor: 'lightgreen', padding: 10, marginTop: '10px' }}>{successNotification}</div>}
      {errorNotification && <div style={{ backgroundColor: 'red', padding: 10, marginTop: '10px' }}>{errorNotification}</div>}
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
      {console.log(persons)}
      {persons
        .filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
        .map((person, index) => (
          <div key={index}>
            {person.name + " "} 
            {person.number}
            <button style={{ marginLeft: '5px' }} onClick={() => handleRemove(person.id)}>delete</button>
          </div>
        ))}
    </div>
  );
};

export default App;
