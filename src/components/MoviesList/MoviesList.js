import { useLocation } from 'react-router-dom';
import Card from '../Card/Card';

function MoviesList(props) {
  const { pathname } = useLocation();

  return (
    <section className="movies-list">
      <div className="movies-list__container">
        {pathname === "/movies" ? (
          props.renderedMovies.map(movie => (
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
      {(pathname === "/movies" && props.movies.length > props.displayCards) && (
        <button
          className="movies-list__more"
          onClick={props.handleAddMoreCards}
        >
          Ещё
        </button>
      )
      }
    </section>
  )
}

export default MoviesList;
