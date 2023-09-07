function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__container">
        <div className="footer__year">&copy;2023</div>
        <div className="footer__menu">
          <a
            className="footer__link"
            href="https://practicum.yandex.ru/"
            target='_blank'
            rel="noopener noreferrer"
          >
            Яндекс.Практикум
          </a>
          <a
            className="footer__link"
            href="https://github.com/IzabellaPavlova"
            target='_blank'
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
