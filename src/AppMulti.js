
import './App.css';
import firebase from './firebase';
import {useState, useEffect} from 'react';


function App() {
  const [books, setBooks] = useState([]);
  const [movies, setMovies] = useState([]);
  // const [items, setItems] = useState([]);
  

  useEffect(() => {
    // const dbRef = firebase.database().ref();
    const dbRefBooks = firebase.database().ref('/Favorite Books');
    const dbRefMovies = firebase.database().ref('/Favorite Movies');
    // console.log(dbRefBooks);
    // console.log(dbRefMovies);
    
    

    // pulls object: fav books + fav movies
    // dbRef.on('value', (res) => {
    //   const bookState = [];
    //   const movieState = [];

    // })

    // pulls object: movie1, movie2, etc
    dbRefMovies.on('value', (res) => {
      console.log(res.val());
      const movieState = [];
      const movieData = res.val();
      for(let keys in movieData) {
        movieState.push(movieData[keys]);
        setMovies(movieState);
      }
      // console.log(movieState);
      
    })

    //pulls object: book1, book2, etc
    dbRefBooks.on('value', (response) => {
      console.log(response.val()); 
      const bookState = [];
      const bookData = response.val();
      for(let key in bookData) {
        bookState.push(bookData[key]);
        setBooks(bookState);
      }      
      // console.log(bookState);
    })

    
    

  }, []);

  // reference database
  // const dbRefBooks = firebase.database().ref();
  // const dbRefMovies = firebase.database().ref('/movies');

  // console.log(dbRefBooks);
  // useEffect
 
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
        {movies.map((movie) => {
          return(
            <li>
              <p>{movie}</p>
            </li>
          )
        })}
      </ul>

      <form action="submit">
        <label htmlFor="addBook">Add a new favorite book </label>
        <input type="text" id="addBook" />
        <button>Add Book</button>
      </form>
    </div>
  )
  
  
}

export default App;
