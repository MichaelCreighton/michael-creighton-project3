// plus icon: <i class="far fa-plus-square"></i>
// garbage icon: <i class="far fa-trash-alt"></i>
// font awesome: <script src="https://kit.fontawesome.com/b93b37a9a8.js" crossorigin="anonymous"></script>

import './App.css';
import Header from './Header.js';
import Footer from './Footer.js';
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
    if(bookInput !== '') {
      dbRefBooks.push(bookInput);
    }
    setBookInput('');
  }
  
  const handleMovieChanges = (event) => {
    setMovieInput(event.target.value);
  }
  
  const handleMovieClicks = (event) => {
    event.preventDefault();
    const dbRefMovies = firebase.database().ref('/Favorite Movies');
    if(movieInput !== '') {
      dbRefMovies.push(movieInput);
    }
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
      <Header />
      <div className="wrapper">
        <section className="users">
          <h2> Mike's Favorites  </h2>
        </section>
        <section className="bookMovieGridContainer">
          <section className="bookAndForm">
            <section className="books" id="borderImage1">
              <ul className="bookList" >
                <h2>FAVORITE BOOKS</h2>
                {
                books.map((book) => {
                  return(
                    <>
                    <li key={book.key}>
                      <p>{book.name} <i className="far fa-trash-alt" onClick={() => deleteBook(book.key)} ></i> </p>
                    </li>
                    </>
                  )
                })
                }
              </ul>
            </section>  {/* end class books */}

            <form action="submit" className="bookForm" >
            {/* <label htmlFor="addBook">Add new book: </label> */}
            <p>Add new book: </p>
            <input 
              type="text" 
              id="addBook" 
              onChange={handleBookChanges}
              value={bookInput} 
            />
            <button onClick={handleBookClicks} type="submit"><i class="far fa-plus-square"></i></button>
            
          </form>
          </section>

          <section className="moviesAndForm">
            <section className="movies" id="borderImage2">
              <h2>FAVORITE MOVIES</h2>
              <ul className="movieList" >
                {
                movies.map((movie) => {
                  return(
                    <div>
                      <li key={movie.key}>
                        <p>{movie.name} <i className="far fa-trash-alt" onClick={() => deleteMovie(movie.key)} ></i> </p>
                      </li>
                    </div>
                  )
                })
                }
              </ul>
            </section> {/* end class movies */}
            
              <form action="submit" className="movieForm">
                {/* <label htmlFor="addMovie">Add new movie: </label> */}
                <p>Add new movie: </p>
                <input 
                  type="text" 
                  id="addMovie" 
                  onChange={handleMovieChanges}
                  value={movieInput} 
                />
                <button onClick={handleMovieClicks}><i className="far fa-plus-square"></i></button>
              </form>
            </section>
        </section>
        
      </div>
      <Footer />
    </div>
  )
}

export default App;
