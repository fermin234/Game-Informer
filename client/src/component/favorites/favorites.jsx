import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CardFavorite from "../CardFavorite/CardFavorite";
import NavBar from "../NavBar/NavBar";
import s from './Favorites.module.css'
import { useModal } from '../../hooks/useModal.js'
import ModalConfimation from "../Modals/ModalConfimation";

export default function Favorites({ match, history }) {

  let [update, setUpdate] = useState(false)
  const favorites = JSON.parse(localStorage.getItem("favorites"))
  const [isOpen, openModal, closeModal] = useModal()

  function handleClearFavs() {
    localStorage.clear()
    setUpdate(!update)
    closeModal()
  }

  useEffect(() => {
  }, [update])

  return (
    <div>
      <NavBar match={match} />
      <div className={s.container}>
        <div className={s.containerList}>
          <ModalConfimation isOpen={isOpen} closeModal={closeModal} >
            <h1 className={s.h1Modal}>¿Desea eliminar todos los juegos de sus favoritos?</h1>
            <div className={s.containerButtonsModal}>
              <button className={s.accept} onClick={() => handleClearFavs()}>Accept</button>
              <button className={s.cancel} onClick={() => closeModal()}>Cancel</button>
            </div>
          </ModalConfimation>
          {
            favorites?.map(e =>
              <div className={s.item}>
                <div className={s.span}>
                  <span>{e.name}</span>
                </div>
              </div>)
          }
          <button className={s.removeFavs} onClick={() => openModal()}> Eliminar todos los favoritos </button>
        </div>
        <div className={s.contarinerCard}>
          {
            !favorites?.length ?
              <div >
                <h1 className={s.error}>Usted no a agregado ningun juego a sus favoritos.</h1>
                <br />
                <br />
                <h1 className={s.error}>Redireccionando a la pagina principal...</h1>
                {setTimeout(() => {
                  history.push("/home")
                }, 5000)}
              </div>
              : undefined
          }
          {favorites?.map(e => <CardFavorite key={e.id} name={e.name} genres={e.genres} image={e.image} id={e.id} setUpdate={setUpdate} update={update} />)}
        </div>
      </div>
    </div >
  )
}