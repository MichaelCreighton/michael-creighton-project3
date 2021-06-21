
import './App.css';
import firebase from './firebase';
import {useState, useEffect} from 'react';


function App() {
  // states for books and movies
  const [books, setBooks] = useState([]);
  const [movies, setMovies] = useState([]);

  // states for interaction
  const [bookInput, setBookInput] = useState('');
  const [movieInput, setMovieInput] = useState('');

  
  
  useEffect(() => {
    // database references
    const dbRefBooks = firebase.database().ref('/Favorite Books');
    const dbRefMovies = firebase.database().ref('/Favorite Movies');

    //pulls object: book1, book2, etc from firebase
    dbRefBooks.on('value', (response) => {
      // new var to hold the new state
      const bookState = [];
      // store the response from firebase to bookData
      // and use .val() to get the info for us
      const bookData = response.val();
      // iterate through bookData to get each title
      for(let key in bookData) {
        // push each title to bookState array
        bookState.push({key: key, name: bookData[key]});
        // use setBooks to update our state
      }      
      setBooks(bookState);
    })

    //pulls object: movie1, movie2, etc from firebase
    dbRefMovies.on('value', (response) => {
      // new var to hold the new state
      const movieState = [];
      // store the response from firebase to movieData
      // and use .val() to get the info for us
      const movieData = response.val();
      // iterate through movieData to get each title
      for(let key in movieData) {
        // push each title to movieState array
        movieState.push({key: key, name: movieData[key]});
        // use setMovies to update our state
      }      
      setMovies(movieState);
    })

  }, []);

  // An event listener to watch for input changes
  const handleBookChanges = (event) => {
    setBookInput(event.target.value);
  }
  const handleBookClicks = (event) => {
    event.preventDefault();
    const dbRefBooks = firebase.database().ref('/Favorite Books');
    dbRefBooks.push(bookInput);
    setBookInput('');
  }
  
  const handleMovieChanges = (event) => {
    setMovieInput(event.target.value);
  }
  const handleMovieClicks = (event) => {
    event.preventDefault();
    const dbRefMovies = firebase.database().ref('/Favorite Movies');
    dbRefMovies.push(movieInput);
    setMovieInput('');
  }

  const deleteBook = (bookId) => {
    const dbRefBooks = firebase.database().ref('/Favorite Books');
    dbRefBooks.child(bookId).remove();
  }
  const deleteMovie = (movieId) => {
    const dbRefMovies = firebase.database().ref('/Favorite Movies');
    dbRefMovies.child(movieId).remove();
  }

  return (
    <div>
      <ul>
        {
        books.map((book) => {
          return(
            <li key={book.key}>
              <p>{book.name}</p>
              <button onClick={() => deleteBook(book.key)}>Remove Book</button>
            </li>
          )
        })
        }
        {
        movies.map((movie) => {
          return(
            <li key={movie.key}>
              <p>{movie.name}</p>
              <button onClick={() => deleteMovie(movie.key)}> Remove Movie</button>
            </li>
          )
        })
        }
      </ul>

      <form action="submit">
        <label htmlFor="addBook">Add a new favorite book </label>
        <input 
          type="text" 
          id="addBook" 
          onChange={handleBookChanges}
          value={bookInput} 
        />
        <button onClick={handleBookClicks} >Add Book</button>
      </form>

      <form action="submit">
        <label htmlFor="addMovie">Add a new favorite movie </label>
        <input 
          type="text" 
          id="addMovie" 
          onChange={handleMovieChanges}
          value={movieInput} 
        />
        <button onClick={handleMovieClicks} >Add Movie</button>
      </form>
    </div>
  )
}

export default App;
