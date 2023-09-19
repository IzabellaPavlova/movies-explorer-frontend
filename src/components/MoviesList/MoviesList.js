import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from '../Card/Card';

function MoviesList(props) {
  const { pathname } = useLocation();
  const [filmNumber, setfilmNumber] = useState(12);
  const windowWidth = window.innerWidth;

  useEffect(() => {
    function handleResize() {
      let visibleMovies;
      if (windowWidth < 750) {
        visibleMovies = 5;
      } else if ((windowWidth > 750) && (windowWidth < 1200)) {
        visibleMovies = 8;
      } else {
        visibleMovies = 12;
      }
      return (setfilmNumber(visibleMovies));
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  function handleLoadMore() {
    if (windowWidth < 750) {
      setfilmNumber((movies) => movies + 2);
    } else if ((windowWidth > 750) && (windowWidth < 1195)) {
      setfilmNumber((movies) => movies + 2);
    } else {
      setfilmNumber((movies) => movies + 3);
    }
  };

  const renderedMovies = props.movies.slice(0, filmNumber);

  return (
    <section className="movies-list">
      <div className="movies-list__container">
        {pathname === "/movies" ? (
          renderedMovies.map(movie => (
            <Card
              key={movie.id}
              movie={movie}
              savedMovies={props.savedMovies}
              onSaveMovie={props.onSave}
            />
          ))) :
          props.movies.map(movie => (
            <Card
              key={movie._id}
              movie={movie}
              savedMovies={props.movies}
              onSaveMovie={props.onSave}
            />
          ))}
      </div>
      {(pathname === "/movies" && props.movies.length > filmNumber) && (
        <button
          className="movies-list__more"
          onClick={handleLoadMore}
        >
          Ещё
        </button>
      )
      }
    </section>
  )
}

export default MoviesList;
