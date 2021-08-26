// plus icon: <i class="far fa-plus-square"></i>
// garbage icon: <i class="far fa-trash-alt"></i>
// font awesome: <script src="https://kit.fontawesome.com/b93b37a9a8.js" crossorigin="anonymous"></script>

import './App.css';
import Header from './Header.js';
import Footer from './Footer.js';
import firebase from './firebase';
import {useState, useEffect} from 'react';


function App() {
  // states for books, movies and users
  const [books, setBooks] = useState([]);
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);

  // states for interaction
  const [bookInput, setBookInput] = useState("");
  const [movieInput, setMovieInput] = useState("");
  const [userInput, setUserInput] = useState('');


  useEffect(() => {
    // database references
    const dbRefBooks = firebase.database().ref("/Favorite Books");
    const dbRefMovies = firebase.database().ref("/Favorite Movies");
    const dbRefUsers = firebase.database().ref('/users');

    //pulls object: book1, book2, etc from firebase
    dbRefBooks.on("value", (response) => {
      // new var to hold the new state
      const bookState = [];
      // store the response from firebase to bookData
      // and use .val() to get the info for us
      const bookData = response.val();
      // iterate through bookData to get each title
      for (let key in bookData) {
        // push each title to bookState array
        bookState.push({ key: key, name: bookData[key] });
      }
      // use setBooks to update our state
      setBooks(bookState);
    });

    //pulls object: movie1, movie2, etc from firebase
    dbRefMovies.on("value", (response) => {
      // new var to hold the new state
      const movieState = [];
      // store the response from firebase to movieData
      // and use .val() to get the info for us
      const movieData = response.val();
      // iterate through movieData to get each title
      for (let key in movieData) {
        // push each title to movieState array
        movieState.push({ key: key, name: movieData[key] });
      }
      // use setMovies to update our state
      setMovies(movieState);
    });


    // pulls object: user1, user2, etc from firebase  
    dbRefUsers.on('value', (response) => {
      //new var to hold the new state
      const userState = [];
      // store the response to userdata
      // ad use val to get the info
      const userData = response.val();

      console.log(userData);
      // iterate through userdata to get each user
      for(let key in userData) {
        // push each user to userstate array
        userState.push({key: key, name: userData[key]});

      }
      // use setUser to update our state
      setUsers(userState);
    })


  }, []);

  // An event listener to watch for input changes
  const handleBookChanges = (event) => {
    setBookInput(event.target.value);
  };

  const handleBookClicks = (event) => {
    event.preventDefault();
    const dbRefBooks = firebase.database().ref("/Favorite Books");
    dbRefBooks.push(bookInput);
    setBookInput("");
  };

  const handleMovieChanges = (event) => {
    setMovieInput(event.target.value);
  };

  const handleMovieClicks = (event) => {
    event.preventDefault();
    const dbRefMovies = firebase.database().ref("/Favorite Movies");
    dbRefMovies.push(movieInput);
    setMovieInput("");
  };

  const deleteBook = (bookId) => {
    const dbRefBooks = firebase.database().ref("/Favorite Books");
    dbRefBooks.child(bookId).remove();
  };
  const deleteMovie = (movieId) => {
    const dbRefMovies = firebase.database().ref("/Favorite Movies");
    dbRefMovies.child(movieId).remove();
  };

  return (
    <div>
      <Header />
      <div className="wrapper">
        <section className="users">
          {users.map((user) => {
            return (
              <>
                {/* <h2>Current User: {user.key}</h2> */}
                {/* <li key={user.key}/> */}
                {/* <p>{user.key} </p> */}

                
                  <select>
                    <option value={users}>{user.key}</option>
                  </select>
                
              </>
            );
          })}
        </section>
        <section className="bookMovieGridContainer">
          <section className="books" id="borderImage1">
            <ul className="bookList">
              <h2>FAVORITE BOOKS</h2>
              {books.map((book) => {
                return (
                  <>
                    <li key={book.key}>
                      <p>
                        {book.name}{" "}
                        <i
                          className="far fa-trash-alt"
                          onClick={() => deleteBook(book.key)}
                        ></i>{" "}
                      </p>
                    </li>
                  </>
                );
              })}
            </ul>
          </section>{" "}
          {/* end class books */}
          <section className="movies" id="borderImage2">
            <h2>FAVORITE MOVIES</h2>
            <ul className="movieList">
              {movies.map((movie) => {
                return (
                  <div>
                    <li key={movie.key}>
                      <p>
                        {movie.name}{" "}
                        <i
                          className="far fa-trash-alt"
                          onClick={() => deleteMovie(movie.key)}
                        ></i>{" "}
                      </p>
                    </li>
                  </div>
                );
              })}
            </ul>
          </section>{" "}
          {/* end class movies */}
          <form action="submit" className="bookForm">
            <label htmlFor="addBook">Add new book </label>
            <input
              type="text"
              id="addBook"
              onChange={handleBookChanges}
              value={bookInput}
            />
            <button onClick={handleBookClicks} type="submit">
              <i class="far fa-plus-square"></i>
            </button>
          </form>
          <form action="submit" className="movieForm">
            <label htmlFor="addMovie">Add new movie </label>
            <input
              type="text"
              id="addMovie"
              onChange={handleMovieChanges}
              value={movieInput}
            />
            <button onClick={handleMovieClicks}>
              <i class="far fa-plus-square"></i>
            </button>
          </form>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default App;
