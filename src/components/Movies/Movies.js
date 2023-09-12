import { useEffect, useState } from "react";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesList from '../MoviesList/MoviesList';
import SearchForm from "../SearchForm/SearchForm";
import { movies } from '../../utils/constants';

function Movies(props) {
  const [IsloggedIn, setIsLoggedIn] = useState(false);
  // const [movies, setMovies] = useState([]);

  useEffect(() => {
    setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    if (IsloggedIn) {
      // setMovies(moviesList);
    }
  }, [IsloggedIn]);

  return (
    <div className="page">
      <Header isLoggedIn={props.isLoggedIn}/>
      <main className="movies">
        <SearchForm />
        <MoviesList movies={movies}/>
      </main>
      <Footer />
    </div>
  )
}

export default Movies;
