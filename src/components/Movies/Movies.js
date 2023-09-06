import { useEffect, useState } from "react";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from "../SearchForm/SearchForm";

function Movies() {
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
      <Header IsloggedIn = {IsloggedIn}/>
      <SearchForm/>
      <Footer />
    </div>
  )
}

export default Movies;
