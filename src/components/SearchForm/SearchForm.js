import { useState } from "react";
import { useLocation } from "react-router-dom";

function SearchForm(props) {
  const [query, setQuery] = useState(props.query || '');
  const [isShortFilms, setIsShortFilms] = useState(props.isShortFilms || false);
  const { pathname } = useLocation();

  const queryErrorClass = (
    `search-form__input-error ${((query === '') && pathname === "/movies")
      ? 'search-form__input-error_visible'
      : ''
    }`
  );

  function handleQueryInput(evt) {
    setQuery(evt.target.value);
  }

  function handleShortFilmCheckbox(evt) {
    setIsShortFilms(evt.target.checked);
    submitCallback(evt.target.checked);
  }

  function submitCallback(isShortFilms) {
    const searchOptions = {
      query: query,
      isShortFilms: isShortFilms,
    };
    props.onSearch(searchOptions);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    submitCallback(isShortFilms)
  };

  return (
    <section>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-form__container">
          <input
            className="search-form__input"
            placeholder="Фильм"
            value={query}
            required
            onChange={handleQueryInput}
          >
          </input>
          <button className="search-form__button"></button>
        </div>
        <span className={queryErrorClass}>Нужно ввести ключевое слово</span>
        <label className="search-form__checkbox" htmlFor="checkbox">
          <input
            type="checkbox"
            role="switch"
            className="search-form__switch"
            id="checkbox"
            onChange={handleShortFilmCheckbox}
            checked={isShortFilms}
          >
          </input>
          <span className="search-form__checkbox-inner"></span>
          <span className="search-form__text">Короткометражки</span>
        </label>
      </form>
    </section>
  )
}

export default SearchForm;
