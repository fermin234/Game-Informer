import React from 'react'
import NavBar from '../NavBar/NavBar'
import s from './About.module.css'
// import * as imagesPage from '../../assets/App'
import * as iconsSocials from '../../assets/Socials'
import { useModal } from '../../hooks/useModal'
import ModalImage from '../Modals/ModalImage'
import { useState } from 'react'
import imagesPage from '../../assets/App'

export default function About({ match }) {

  const [isOpen, openModal, closeModal] = useModal()
  let [imgValue, setImgValue] = useState(null)

  // const images = []
  const icons = []
  for (const e in iconsSocials) {
    icons.push(iconsSocials[e])
  }
  // for (const e in imagesPage) {
  //   images.push(imagesPage[e])
  // }

  function handleModal(e) {
    setImgValue(e)
    openModal()
  }

  return (
    <div>
      <NavBar match={match} />
      <div className={s.container}>
        <div>
          <h1>⚡️-- Game Informer --⚡️</h1>
        </div>
        <h3>
          Game Informer es SPA(Simple Page Application) de video juegos que cuenta con un apartado para ver información específica de cada video juego al darle click (fecha de lanzamiento, plataformas, generos, fotos, etc.).
        </h3>
        <div className={s.containerH3}>
          <h3>
            🔹En su home se encuentra un apartado de búsqueda, filtros, ordenamientos, cuenta con una paginación completa, mostrando todas las paginas por las cuales el usuario puede navegar tranquilamente.
          </h3>
          <h3>
            🔹Cuenta con una sección para agregar un nuevo videogame en la cual podrá ingresar información gracias a un formulario totalmente validado con JavaScript y persistente(al cerrar la pagina los datos del formulario de creacion quedan guardados).
          </h3>
          <h3>
            🔹El usuario puede guardar sus videos juegos favoritos ya que cuenta con un apartado de favoritos persistente el cual se maneja con localStorage.
          </h3>
          <h3>
            🔹Se implemento un icono para que el usuario pueda saber desde la pagina principal cuales juegos tiene guardado en sus favoritos tambien al realizar cualquier accion pesada, se renderiza un modal predeterminado segun la ocasion.
          </h3>
          <h3>
            🔹Se puede eliminar un video juego siempre y cuando tengas la contraseña.
          </h3>
          <h3>
            🔹La pagina cuenta tambien con un apartado de redes sociales para que el usuario pueda investigar sobre el creador de la pagina, tambien un apartado sobre la pagina, el cual informa todas sus funcionalidades.
          </h3>
        </div>
        <div className={s.containerTechnologies}>
          <div className={s.subContarnerTechnologies}>
            <div>
              <h1>Technologies and Tools</h1>
              <a href="https://www.javascript.com/" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="50" width="52" alt="javascript logo" />
              </a>

              <a href="https://es.reactjs.org/" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="50" width="52" alt="react logo" />
              </a>

              <a href="https://es.redux.js.org/" target="_blank" rel="noopener noreferrer">
                <img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/redux/redux-original.svg" height="50" width="52" alt="redux logo" />
              </a>

              <a href="https://nodejs.org/es/" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="50" width="52" alt="nodejs logo" />
              </a>

              <a href="https://expressjs.com/es/" target="_blank" rel="noopener noreferrer">
                <img src="https://www.nextontop.com/assets/img/services/web/expressjs.svg" height="55" width="80" alt="express logo" />
              </a>

              <a href="https://www.postgresql.org/" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" height="40" width="40" alt="postgresql logo" />
              </a>

              <a href="https://sequelize.org/" target="_blank" rel="noopener noreferrer">
                <img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/sequelize/sequelize-original.svg" height="50" width="52" alt="sequelize logo" />
              </a>

              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="40" width="52" alt="css3 logo" />
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" width="52" alt="html5 logo" />
              <a href="https://git-scm.com/" target="_blank" rel="noopener noreferrer">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" height="40" width="52" alt="git logo" />
              </a>
            </div>
            <div className={s.containerTechnologiesText}>
              <p>
                🔹JavaScript
                🔹React.js
                🔹Redux
                🔹Node.js
                🔹Express
                <br />
                🔹PostgreSQL
                🔹Sequelize
                🔹CSS
                🔹HTML
                🔹Git
              </p>
            </div>
          </div>
        </div>
        <div className={s.images}>
          <div>
            <h1>LandingPage:</h1>
            <img className={s.image} src={imagesPage.LandingPage} alt="LandingPage" onClick={() => handleModal(imagesPage.LandingPage)} />
          </div>
          <div>
            <h1>Home:</h1>
            <img className={s.image} src={imagesPage.Home} alt="Home" onClick={() => handleModal(imagesPage.Home)} />
          </div>
          <div>
            <h1>Favorites:</h1>
            <div className={s.containerImages}>
              <img className={s.image} src={imagesPage.Favorites} alt="Favorites" onClick={() => handleModal(imagesPage.Favorites)} />
              <img className={s.image} src={imagesPage.Favorites2} alt="Favorites1" onClick={() => handleModal(imagesPage.Favorites2)} />
              <img className={s.image} src={imagesPage.Favorites3} alt="Favorites2" onClick={() => handleModal(imagesPage.Favorites3)} />
              <img className={s.image} src={imagesPage.Favorites4} alt="Favorites3" onClick={() => handleModal(imagesPage.Favorites4)} />
              <img className={s.image} src={imagesPage.Favorites5} alt="Favorites4" onClick={() => handleModal(imagesPage.Favorites5)} />
            </div>
          </div>
          <div>
            <h1>Detail Video Game:</h1>
            <div className={s.containerImages}>
              <img className={s.image} src={imagesPage.VideoGameDetail1} alt="Detail" onClick={() => handleModal(imagesPage.VideoGameDetail1)} />
              <img className={s.image} src={imagesPage.VideoGameDetail2} alt="Detail1" onClick={() => handleModal(imagesPage.VideoGameDetail2)} />
              <div className={s.containerImages}>
              </div>
            </div>
          </div>
          <div>
            <h1>Create Video Game:</h1>
            <div className={s.containerImages}>
              <img className={s.image} src={imagesPage.CreateVideoGame} alt="Create" onClick={() => handleModal(imagesPage.CreateVideoGame)} />
              <img className={s.image} src={imagesPage.CreateVideoGame2} alt="Create1" onClick={() => handleModal(imagesPage.CreateVideoGame2)} />
              <div className={s.containerImages}>
              </div>
            </div>
          </div>
          <div>
            <h1>Delete Video Game:</h1>
            <img className={s.image} src={imagesPage.DeleteVideoGame} alt="Delete" onClick={() => handleModal(imagesPage.DeleteVideoGame)} />
          </div>
        </div>
        <ModalImage isOpen={isOpen} closeModal={closeModal}>
          <img className={s.imgModal} id="img" src={imgValue} alt={imgValue} />
        </ModalImage>
        <footer className={s.footer}>
          <a href="https://github.com/fermin234" target="_blank" rel="noopener noreferrer">
            <img src={icons[0]} alt="github" />
          </a>
          <img src={icons[4]} alt="diagonal" />
          <a href="https://www.linkedin.com/in/fermin-solaberrieta/" target="_blank" rel="noopener noreferrer">
            <img src={icons[1]} alt="linkedin" />
          </a>
          <img src={icons[4]} alt="diagonal" />
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <img src={icons[2]} alt="portfolio" />
          </a>
          <img src={icons[4]} alt="diagonal" />
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <img src={icons[3]} alt="whatsapp" />
          </a>
        </footer>
      </div>
    </div >
  )
}
