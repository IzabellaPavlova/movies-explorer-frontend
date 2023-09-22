import { useEffect, useState } from "react";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesList from '../MoviesList/MoviesList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import api from '../../utils/api';
import moviesApi from '../../utils/moviesApi';
import { SCREEN_WIDTH, ADD_MORE_CARDS, CARDS_NUMBER, MAX_SHORT_DURATION } from "../../utils/constants";

function Movies(props) {
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [moviesSearch, setMoviesSearch] = useState(
    localStorage.getItem('searchResult')
    ? JSON.parse(localStorage.getItem('searchResult'))
    : []
  );
  const [displayCards, setDisplayCards] = useState(12);
  const [emptyResult, setEmptyResult] = useState(false);
  const [preloader, setPreloader] = useState(false);
  const [searchError, setSearchError] = useState('');

  const searchOptions = JSON.parse(localStorage.getItem('searchOptions')) || {};
  const query = searchOptions.query || '';
  const isShortFilms = searchOptions.isShortFilms || false;

  const renderedMovies = moviesSearch.slice(0, displayCards);

  // catch movies

  useEffect(() => {
    getSavedMovies();
  }, []);

  function getMovies(searchOptions) {
    const { query, isShortFilms } = searchOptions;
    if (!localStorage.getItem('movies')) {
      setPreloader(true);
      moviesApi.getMovies()
      .then((data) => {
        setMovies(data);
        localStorage.setItem('movies', JSON.stringify(data));
        handleSearchMovies(data, query, isShortFilms);
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
      .finally(() => {
        setPreloader(false)
      });
    }
    else {
      const movies = JSON.parse(localStorage.getItem('movies'));
      handleSearchMovies(movies, query, isShortFilms);
    }
  }

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

  function handleSearchMovies(movies, query, isShortFilms) {
    localStorage.setItem('searchOptions', JSON.stringify({query: query, isShortFilms: isShortFilms}));
    let searchResult = [];
    if (query !== '') {
      searchResult = movies.filter((movie) => {
        const ruMovies = movie.nameRU.toLowerCase().includes(query.toLowerCase());
        const enMovies = movie.nameEN.toLowerCase().includes(query.toLowerCase());
        const short = movie.duration <= MAX_SHORT_DURATION;
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

  // cards number
  useEffect(() => {
    updateDisplayCards();
    window.addEventListener("resize", () => {
      updateDisplayCards();
    });

    return () => {
      window.removeEventListener("resize", updateDisplayCards);
    };
  }, [moviesSearch]);

  function updateDisplayCards() {
    const screenWidth = window.innerWidth;
    let number;
    if (screenWidth >= SCREEN_WIDTH.LARGE) {
      number = CARDS_NUMBER.LARGE;
    } else if (screenWidth < SCREEN_WIDTH.LARGE && screenWidth > SCREEN_WIDTH.MOBILE) {
      number = CARDS_NUMBER.TABLET;
    } else {
      number = CARDS_NUMBER.MOBILE;
    }
    setDisplayCards(number);
  }

  const handleAddMoreCards = () => {
    const windowWidth = window.innerWidth;
    let number;
    if (windowWidth >= SCREEN_WIDTH.LARGE) {
      number = ADD_MORE_CARDS.THREE;
    } else {
      number = ADD_MORE_CARDS.TWO;
    }
    setDisplayCards(displayCards + number);
  };

  return (
    <div className="page">
      <Header isLoggedIn={props.isLoggedIn}/>
      <main className="movies">
        <SearchForm onSearch={getMovies} query={query} isShortFilms={isShortFilms}/>
        {(emptyResult) && <span className='movies-list__error'>Ничего не найдено</span>}
        {(searchError) && <span className='movies-list__error'>{searchError}</span>}
        {preloader && <Preloader />}
        {(!emptyResult && query !== '') &&
          <MoviesList
            movies={moviesSearch}
            savedMovies={savedMovies}
            onSave={handleSaveMovie}
            renderedMovies={renderedMovies}
            handleAddMoreCards={handleAddMoreCards}
            displayCards={displayCards}
          />
        }
      </main>
      <Footer />
    </div>
  )
}

export default Movies;
