import React from "react";
import { Link } from "react-router-dom";
import s from './Card.module.css'
import { useDispatch } from "react-redux";
import { deleteVideoGame } from "../../redux/actions";
import { useModal } from "../../hooks/useModal";
import ModalConfimation from "../Modals/ModalConfimation";

export default function Card({ id, name, genres, image, platforms, created, match, update, setUpdate }) {

  const dispatch = useDispatch()
  const [isOpen, openModal, closeModal] = useModal()
  const [isOpenComfirmation, openModalComfirmation, closeModalComfirmation] = useModal()
  let butonFav = document.getElementsByName(`buttonFav${id}`)
  let favorites = JSON.parse(localStorage.getItem("favorites"))

  function handleFavorite() {
    let favorites = JSON.parse(localStorage.getItem("favorites"))
    if (favorites.find(e => e.id === id)) {
      let index = favorites.findIndex(e => e.id === id)
      favorites.splice(index, 1)
      localStorage.setItem("favorites", JSON.stringify(favorites))
      butonFav[0].innerHTML = "🤍"
      setUpdate(!update)
    } else {
      favorites = [...favorites, { name, genres, image, id }]
      localStorage.setItem("favorites", JSON.stringify(favorites))
      butonFav[0].innerHTML = "❤"
      setUpdate(!update)
    }
    closeModal()
  }

  async function handleDelete(e) {
    dispatch(deleteVideoGame(id))
  }

  return (
    <>
      <ModalConfimation isOpen={isOpenComfirmation} closeModal={closeModalComfirmation}>
        <h1 className={s.h1Modal}>{`Deleted ${name}?`}</h1>
        <div className={s.containerButtonsModal}>
          <button className={s.accept} onClick={handleDelete}>Accept</button>
          <button className={s.cancel} onClick={closeModalComfirmation}>Cancel</button>
        </div>
      </ModalConfimation>
      <ModalConfimation isOpen={isOpen} closeModal={closeModal}>
        <h1 className={s.h1Modal}>{`Remove ${name} from your favourites?`}</h1>
        <div className={s.containerButtonsModal}>
          <button className={s.accept} onClick={handleFavorite}>Accept</button>
          <button className={s.cancel} onClick={closeModal}>Cancel</button>
        </div>
      </ModalConfimation>
      <div className={s.card} >
        {
          match.path === '/create' ?
            undefined
            : match.path !== '/home' ?
              <button name={`buttonFav${id}`} className={s.fav} onClick={openModal}> {
                favorites.find(e => e.id === id) ? "❤" : "🤍"
              } </button>
              : match.path === '/home' ?
                <button name={`buttonFav${id}`} className={s.fav} onClick={handleFavorite}> {
                  favorites.find(e => e.id === id) ? "❤" : "🤍"
                } </button>
                : undefined
        }
        {
          match.path !== '/create' ?
            <Link className={s.link} to={`/detail/${id}`} >
              <img className={s.img} src={image} alt={`${name}-imagen`} />
              <div className={s.containerName}>
                <h3>{name}</h3>
              </div>
              <div className={s.labels}>
                {
                  genres.length > 3 ?
                    genres.slice(0, 3).map(e => <label key={e + id}>{e}</label>)
                    : genres.map(e => <label key={e + id}>{e}</label>)
                }
              </div>
            </Link>
            :
            <div className={s.link}>
              <img className={s.img} src={image} alt={`${name}-imagen`} />
              <div className={s.containerName}>
                <h3>{name}</h3>
              </div>
              <div className={s.containerGenres}>
                {
                  genres?.length ? <h3>Genres:</h3> : undefined
                }
                <div className={s.labels}>
                  {
                    genres.map(e => <label key={e + id}>{e}</label>)
                  }
                </div>
              </div>
              <div className={s.containerPlatforms}>
                {
                  platforms?.length ? <h3>Platforms:</h3> : undefined
                }
                <div className={s.platforms}>
                  {
                    platforms?.length ? platforms.map(e => <label key={e}>{e}</label>) : undefined
                  }
                </div>
              </div>
            </div>
        }
        {
          match.path !== '/create' &&
            created ? <button className={s.deletedButton} onClick={openModalComfirmation}> Delete </button> : undefined
        }
      </div>
    </>
  )
}