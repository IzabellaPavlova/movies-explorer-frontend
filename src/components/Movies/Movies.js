import { useEffect, useState } from "react";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesList from '../MoviesList/MoviesList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import api from '../../utils/api';
import moviesApi from '../../utils/moviesApi';

function Movies(props) {
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [moviesSearch, setMoviesSearch] = useState([]);
  const [emptyResult, setEmptyResult] = useState(false);
  const [preloader, setPreloader] = useState(false);
  const [searchError, setSearchError] = useState('');

  const searchOptions = JSON.parse(localStorage.getItem('searchOptions')) || {};
  const query = searchOptions.query || '';
  const isShortFilms = searchOptions.isShortFilms || false;

  // catch movies

  useEffect(() => {
    getMovies();
    getSavedMovies();
  }, []);

  function getMovies() {
    moviesApi.getMovies()
      .then((data) => {
        setPreloader(true);
        setMovies(data);
        localStorage.setItem('movies', JSON.stringify(data));
        setSearchError('');
      })
      .catch((err) => {
        console.log(err);
        setSearchError(
          `Во время запроса произошла ошибка.
          Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз.`
        );
      })
      .finally(() => setPreloader(false));
  }

  function getSavedMovies() {
    api.getSavedMovies()
      .then((data) => {
        setPreloader(true);
        setSavedMovies(data);
        localStorage.setItem('savedMovies', JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setPreloader(false));
  }

  // add & delete savedMovies

  function addSavedMovie(movie) {
    api.addSavedMovie(movie)
      .then((data) => {
        setSavedMovies([...savedMovies, data]);
        getSavedMovies();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function removeMovie(savedMovie) {
    api.removeMovie(savedMovie._id)
      .then((data) => {
        getSavedMovies();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleSaveMovie(movie) {
    const isLiked = savedMovies.some(i => i.movieId === movie.id);
    if (!isLiked) {
      addSavedMovie(movie)
    } else {
      savedMovies.forEach(savedMovie => {
        if (savedMovie.movieId === movie.id) {
          removeMovie(savedMovie)
        }
      })
    }
  }

  // search

  function handleSearchMovies(searchOptions) {
    localStorage.setItem('searchOptions', JSON.stringify(searchOptions));
    const { query, isShortFilms } = searchOptions;
    let searchResult = [];
    if (query !== '') {
      searchResult = movies.filter((movie) => {
        const ruMovies = movie.nameRU.toLowerCase().includes(query.toLowerCase());
        const enMovies = movie.nameEN.toLowerCase().includes(query.toLowerCase());
        const short = movie.duration <= 40;
        if (isShortFilms) {
          return (short && (ruMovies || enMovies))
        } else {
          return (ruMovies || enMovies);
        }
      });
    }
    if (query === '' || searchResult.length === 0) {
      setEmptyResult(true);
    }
    else {
      setEmptyResult(false);
    }
    localStorage.setItem('searchResult', JSON.stringify(searchResult));
    setMoviesSearch(searchResult);
  }

  return (
    <div className="page">
      <Header isLoggedIn={props.isLoggedIn}/>
      <main className="movies">
        <SearchForm onSearch={handleSearchMovies} query={query} isShortFilms={isShortFilms}/>
        {(emptyResult) && <span className='movies-list__error'>Ничего не найдено</span>}
        {(searchError) && <span className='movies-list__error'>{searchError}</span>}
        {preloader && <Preloader />}
        {(!emptyResult && query !== '') &&
          <MoviesList
            movies={JSON.parse(localStorage.getItem('searchResult')) || moviesSearch}
            savedMovies={savedMovies}
            onSave={handleSaveMovie}
          />
        }
      </main>
      <Footer />
    </div>
  )
}

export default Movies;
