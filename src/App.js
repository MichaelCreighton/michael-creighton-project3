
import './App.css';
import firebase from './firebase';
import {useState, useEffect} from 'react';


function App() {
  const [books, setBooks] = useState([]);
  const [userInput, setUserInput] = useState('');

  const dbRefBooks = firebase.database().ref('/Favorite Books');
  

  useEffect(() => {

    //pulls object: book1, book2, etc
    dbRefBooks.on('value', (response) => {
      // new var to hold the new state
      const bookState = [];
      // store the response from firebase to bookData
      // and use .val() to get the info for us
      const bookData = response.val();
      // iterate through bookData to get each title
      for(let key in bookData) {
        // push each title to bookState array
        bookState.push(bookData[key]);
        // use setBooks to update our state
        setBooks(bookState);
      }      
      console.log(bookState);
      // console.log(books);
      
      
    })

  }, []);

  // An event listener to watch for input changes
  const handleChanges = (event) => {
    setUserInput(event.target.value);
  }

  const handleClicks = (event) => {
    event.preventDefault();
    dbRefBooks.push(userInput);
    setUserInput('');
  }

  return (
    <div>
      <ul>
        {books.map((book) => {
          
          return(
            <li>
              <p>{book}</p>
            </li>
          )
        })}
      </ul>

      <form action="submit">
        <label htmlFor="addBook">Add a new favorite book </label>
        <input 
          type="text" 
          id="addBook" 
          onChange={handleChanges}
          value={userInput} 
        />
        <button onClick={handleClicks} >Add Book</button>
      </form>
    </div>
  )
}

export default App;
