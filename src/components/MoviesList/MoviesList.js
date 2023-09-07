import { useLocation } from 'react-router-dom';
import Card from '../Card/Card';

function MoviesList({ movies }) {
  const { pathname } = useLocation();

  return (
    <section className="movies-list">
      <div className="movies-list__container">
        {movies.map(movie => (
          <Card key={movie.movieId} movie={movie}/>
        ))}
      </div>
      {pathname === "/movies" ? (
        <button className="movies-list__more">
          Ещё
        </button>
      ) : ''
      }
    </section>
  )
}

export default MoviesList;
