import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page">
      <main>
        <section className="not-found">
          <h1 className="not-found__title">404</h1>
          <p className="not-found__subtitle">Страница не найдена</p>
          <Link className="not-found__link" to={-1}>
            Назад
          </Link>
        </section>
      </main>
    </div>
  )
}

export default NotFound;
