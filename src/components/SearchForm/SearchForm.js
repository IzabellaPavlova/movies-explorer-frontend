function SearchForm() {
  return (
    <section>
      <form className="search-form">
        <label className="search-form__container">
          <input className="search-form__input" placeholder="Фильм" required></input>
          <button className="search-form__button"></button>
        </label>
        <label className="search-form__checkbox" htmlFor="checkbox">
          <input type="checkbox" role="switch" className="search-form__switch" id="checkbox"></input>
          <span className="search-form__checkbox-inner"></span>
          <span className="search-form__text">Короткометражки</span>
        </label>
      </form>
    </section>
  )
}

export default SearchForm;
