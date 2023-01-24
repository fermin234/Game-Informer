import React from "react";
import { Link } from "react-router-dom";
import { useModal } from "../../hooks/useModal";
import ModalConfimation from "../Modals/ModalConfimation";
import s from './CardFavorite.module.css'

export default function CardFavorite({ name, genres, image, id, setUpdate, update }) {

  const [isOpen, openModal, closeModal] = useModal()

  function handelDeleted() {
    let favorites = JSON.parse(localStorage.getItem("favorites"))
    let index = favorites.findIndex(e => e.id === id)
    favorites.splice(index, 1)
    localStorage.setItem("favorites", JSON.stringify(favorites))
    setUpdate(!update)
  }

  return (
    <div>
      <ModalConfimation isOpen={isOpen} closeModal={closeModal}>
        <h1 className={s.h1Modal}>{`desea eleiminar ${name}`}</h1>
        <div className={s.containerButtonsModal}>
          <button className={s.accept} onClick={handelDeleted}>Accept</button>
          <button className={s.cancel} onClick={closeModal}>Cancel</button>
        </div>
      </ModalConfimation>
      <div className={s.containerFav}>
        <button className={s.fav} onClick={openModal}> ❤ </button>
      </div>
      <Link className={s.div} to={`/detail/${id}`} >
        <img className={s.img} src={image} alt={`${name}-imagen`} />
        <h3>{name}</h3>
        <h6>{genres.map(e => ` ${e} `)}</h6>
      </Link>
    </div>
  )
}