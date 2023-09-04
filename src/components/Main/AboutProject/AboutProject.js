function AboutProject() {
  return (
    <section className="about-project" id="aboutProject">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__container">
        <div className="about-project__description">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </div>
        <div className="about-project__description">
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className="about-project__schedule">
        <div className="about-project__backend">
          <p className="about-project__week about-project__week_one">1&nbsp;неделя</p>
          <p className="about-project__caption">Back-end</p>
        </div>
        <div className="about-project__frontend">
          <p className="about-project__week about-project__week_four">4&nbsp;недели</p>
          <p className="about-project__caption">Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;
