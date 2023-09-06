import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Card({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { pathname } = useLocation();

  function handleMovieFavorite() {
    setIsFavorite(!isFavorite);
  }

  function getDuration(duration) {
    return `${Math.trunc(duration / 60)} ч ${duration % 60} м`;
  };

  return (
    <section className="card">
      <img src={movie.image} alt="Обложка фильма" className="card__image"></img>
      <div className="card__container">
        <h2 className="card__title">{movie.nameRU}</h2>
        <p className="card__duration">
          {getDuration(movie.duration)}
        </p>
      </div>
      <button
        className={`card__save ${pathname === '/movies' ? isFavorite ? 'card__save_active' : '' : 'card__save_disabled'}`}
        aria-label="favorite"
        type="button"
        onClick={handleMovieFavorite}
      >
        Сохранить
      </button>
    </section>
  )
}

export default Card;
