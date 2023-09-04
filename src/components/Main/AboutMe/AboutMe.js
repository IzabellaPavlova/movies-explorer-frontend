import photo from '../../../images/student_photo.jpg';

function AboutMe() {
  return (
    <section className="about-me" id="student">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__subtitle">Изабелла</h3>
          <p className="about-me__description">Full-stack разработчик, 21&nbsp;год</p>
          <p className="about-me__text">
          Путешествую по миру, учусь и пишу код. В 2022 году закончила МГТУ им. Н.Э. Баумана.
          Проектировала болид для формулы студент и собирала квадрокоптеры.
          Больше 2х лет работала backend разработчиком в МТС Диджитал.
          Чтобы разобраться во frontend-разработке закончила курс по веб-разработке Яндекс Практикума.
          </p>
          <a
          className="about-me__link"
          href="https://github.com/IzabellaPavlova"
          target='_blank'
          rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
        <img className="about-me__photo" src={photo} alt="Портрет"/>
      </div>
    </section>
  )
}

export default AboutMe;
