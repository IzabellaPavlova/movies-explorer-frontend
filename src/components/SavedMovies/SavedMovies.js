import { useEffect, useState } from "react";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesList from '../MoviesList/MoviesList';
import SearchForm from "../SearchForm/SearchForm";
import api from '../../utils/api';

function SavedMovies(props) {
  const [savedMovies, setSavedMovies] = useState(JSON.parse(localStorage.getItem('savedMovies')));
  const [moviesSearch, setMoviesSearch] = useState([]);
  const [emptyResult, setEmptyResult] = useState(false);
  const [query, setQuery] = useState('');
  const [isShort, setIsShort] = useState(false);

  // catch saved movies

  function getSavedMovies() {
    api.getSavedMovies()
      .then((data) => {
        setSavedMovies(data);
        localStorage.setItem('savedMovies', JSON.stringify(data));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getSavedMovies();
  }, []);

  // search

  function handleSearchMovies(searchOptions) {
    const { query, isShortFilms } = searchOptions;
    setQuery(query);
    setIsShort(isShortFilms);
    const searchResult = savedMovies.filter((movie) => {
      const ruMovies = (query !== '') ? movie.nameRU.toLowerCase().includes(query.toLowerCase()) : true;
      const enMovies = (query !== '') ? movie.nameEN.toLowerCase().includes(query.toLowerCase()) : true;
      const short = movie.duration <= 40;
      if (isShortFilms) {
        return (short && (ruMovies || enMovies))
      } else {
        return (ruMovies || enMovies);
      }
    });
    if (searchResult.length === 0) {
      setEmptyResult(true);
    }
    else {
      setEmptyResult(false);
    }
    setMoviesSearch(searchResult);
  }

  useEffect(() => {
    handleSearchMovies({
      query: query,
      isShortFilms: isShort
    });
  }, [savedMovies]);

  // dislike

  function removeMovie(savedMovie) {
    api.removeMovie(savedMovie._id)
      .then((data) => {
        getSavedMovies();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="page">
      <Header isLoggedIn={props.isLoggedIn}/>
      <main className="movies">
        <SearchForm onSearch={handleSearchMovies} />
        {(emptyResult) && <span className='movies-list__error'>Ничего не найдено</span>}
        {(!emptyResult) &&
          <MoviesList
            movies={savedMovies ? moviesSearch.length === 0 ? savedMovies : moviesSearch : []}
            onSave={removeMovie}
          />
        }
      </main>
      <Footer />
    </div>
  )
}

export default SavedMovies;
