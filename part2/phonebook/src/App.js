import axios from "axios";
import { useEffect, useState } from "react";

import personService from "./services/persons";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="addedMessage">{message}</div>;
};

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const Person = (props) => {
  function handleDelete() {
    props.handleDeletePerson(props.id);
  }

  return (
    <li>
      {props.name} {props.number} <button onClick={handleDelete}>delete</button>
    </li>
  );
};

const Filter = (props) => {
  return (
    <div>
      filter shown with &nbsp;{" "}
      <input value={props.newSearch} onChange={props.handleSearchChange} />
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: &nbsp;
        <input value={props.newName} onChange={props.handlePersonChange} />
      </div>
      <div>
        number: &nbsp;
        <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = (props) => {
  return (
    <ul>
      {props.currentPersons.map((person) => (
        <Person
          name={person.name}
          number={person.number}
          id={person.id}
          handleDeletePerson={props.handleDeletePerson}
        />
      ))}
    </ul>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState(0);
  const [currentPersons, setCurrentPersons] = useState(persons);
  const [newSearch, setNewSearch] = useState("");
  const [addedMessage, setAddedMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // axios.get("http://localhost:3001/persons").then((response) => {
    //   setPersons(response.data);
    //   setCurrentPersons(response.data);
    // });

    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
      setCurrentPersons(initialPersons);
    });
  }, []);

  const handlePersonChange = (event) => {
    // console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleDeletePerson = async (id) => {
    // event.preventDefault();

    console.log(id);

    // personService.deleteElement(id).then(() => {
    //   // console.log(response);
    //   console.log("hello world");
    //   console.log(persons);
    //   setPersons(persons);
    //   setCurrentPersons(persons);
    // });

    let personn = persons.find((person) => person.id === id);

    if (window.confirm(`Delete ${personn.name} ?`)) {
      axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(() => {
          let copyArray = persons.filter((person) => person.id !== id);
          setPersons(copyArray);
          setCurrentPersons(copyArray);
          console.log(copyArray);
        })
        .catch((error) => console.log(error));
    }

    // let delReq = await fetch(`http://localhost:3001/persons/${id}`,{
    //   method: 'DELETE',
    //   mode: 'cors'
    // })

    // let data = Object.assign({}, persons);
    // let copyArray = persons.filter(person => person.id !== id);
    // setPersons(copyArray);
    // setCurrentPersons(copyArray);
    // console.log(copyArray);
  };

  const addPerson = (event) => {
    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    for (let i = 0; i < persons.length; i++) {
      if (JSON.stringify(persons[i]) === JSON.stringify(personObject)) {
        alert(newName + " is already added to the phonebook");
        return;
      }
    }

    let oldPerson = persons.find((person) => person.name === newName);

    if (oldPerson) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(oldPerson.id, personObject)
          .then((response) => {
            console.log(response);

            let copyArray = [...persons];

            for (let i = 0; i < copyArray.length; i++) {
              if (copyArray[i].name === newName) {
                copyArray[i] = personObject;
              }
            }

            setPersons(copyArray);
            setCurrentPersons(copyArray);
            setNewName("");
            setNewNumber(0);
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${newName} has already been removed from server.`
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setPersons(
              persons.filter((person) => person.id !== personObject.id)
            );
          });
      }
    } else {
      personService.create(personObject).then((returnedPerson) => {
        let copyArray = [...persons];

        copyArray.push(returnedPerson);

        setPersons(copyArray);
        setCurrentPersons(copyArray);
        setNewName("");
        setNewNumber(0);

        setAddedMessage(`${newName} is added to the phonebook.`);
        setTimeout(() => {
          setAddedMessage(null);
        }, 5000);
      }).catch(error => {
        // console.log(error.response.data.error);
        setErrorMessage(error.response.data.error);
      });
    }
  };

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value);

    const regex = new RegExp(newSearch, "i");
    const filteredPersons = () =>
      persons.filter((person) => person.name.match(regex));

    setCurrentPersons(filteredPersons);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={addedMessage} />
      <ErrorMessage message={errorMessage} />
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handlePersonChange={handlePersonChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        currentPersons={currentPersons}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
