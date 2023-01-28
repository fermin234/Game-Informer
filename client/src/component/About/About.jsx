import React from 'react'
import NavBar from '../NavBar/NavBar'
import s from './About.module.css'
import * as imagesPage from '../../assets/App'
import { useModal } from '../../hooks/useModal'
import ModalImage from '../Modals/ModalImage'
import { useState } from 'react'

export default function About({ match }) {

  const [isOpen, openModal, closeModal] = useModal()
  let [imgValue, setImgValue] = useState(null)

  const images = []
  for (const e in imagesPage) {
    images.push(imagesPage[e])
  }

  function handleModal(e) {
    setImgValue(e.target.src)
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
          {
            images?.length && images.map(e => <img key={e} className={s.image} src={e} alt={e} onClick={e => handleModal(e)} />)
          }
        </div>
        <ModalImage isOpen={isOpen} closeModal={closeModal}>
          <img className={s.imgModal} id="img" src={imgValue} alt={imgValue} />
        </ModalImage>
      </div>
    </div >
  )
}
