import { useLocation } from 'react-router-dom';
import {MOVIES_URL} from '../../utils/constants';

function Card(props) {
  const { pathname } = useLocation();
  const isLiked = props.savedMovies.some(i => i.movieId === props.movie.id);

  function handleLikeMovie() {
    props.onSaveMovie(props.movie);
  }

  function getDuration(duration) {
    return `${Math.trunc(duration / 60)}ч ${duration % 60}м`;
  };

  return (
    <section className="card">
      <a href={props.movie.trailerLink} target="_blank" rel="noreferrer">
        <img
          src={pathname === '/movies' ? `${MOVIES_URL}${props.movie.image.url}` : props.movie.image}
          alt="Обложка фильма"
          className="card__image"
        />
      </a>
      <div className="card__container">
        <h2 className="card__title">{props.movie.nameRU}</h2>
        <p className="card__duration">
          {getDuration(props.movie.duration)}
        </p>
      </div>
      <button
        className={`card__save ${pathname === '/movies' ? isLiked ? 'card__save_active' : '' : 'card__save_disabled'}`}
        aria-label="favorite"
        type="button"
        onClick={handleLikeMovie}
      >
        Сохранить
      </button>
    </section>
  )
}

export default Card;
