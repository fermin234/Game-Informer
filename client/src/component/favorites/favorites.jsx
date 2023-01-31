import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Card from "../Card/Card.jsx";
import NavBar from "../NavBar/NavBar";
import s from './Favorites.module.css'
import { useModal } from '../../hooks/useModal.js'
import ModalConfimation from "../Modals/ModalConfimation";
import { Link } from "react-router-dom";

export default function Favorites({ match, history }) {

  let [update, setUpdate] = useState(false)
  const favorites = JSON.parse(localStorage.getItem("favorites"))
  const [isOpen, openModal, closeModal] = useModal()

  function handleClearFavs() {
    localStorage.remove('favorites')
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
            <h1 className={s.h1Modal}>Do you want to remove all games from your favourites?</h1>
            <div className={s.containerButtonsModal}>
              <button className={s.accept} onClick={() => handleClearFavs()}>Accept</button>
              <button className={s.cancel} onClick={() => closeModal()}>Cancel</button>
            </div>
          </ModalConfimation>
          {
            favorites?.map(e =>
              <div className={s.item} key={e.id}>
                <div className={s.span}>
                  <span>{e.name}</span>
                </div>
              </div>)
          }
          <button className={s.removeFavs} onClick={() => openModal()}> Remove all favourites </button>
        </div>
        <div className={s.contarinerCard}>
          {
            !favorites?.length ?
              <>
                <h1 className={s.error}>You have not added any games to your favourites.</h1>
                <br />
                <br />
                <h1 className={s.error}>Click <Link className={s.link} to='/home'>here</Link> to add favourites.</h1>
              </>
              :
              <div className={s.prueba}>
                {favorites?.map(e => <Card key={e.id} name={e.name} genres={e.genres} image={e.image} id={e.id} setUpdate={setUpdate} update={update} match={match} />)}
              </div>
          }
        </div>
      </div>
    </div >
  )
}