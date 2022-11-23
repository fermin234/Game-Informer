import React from "react";
import { Link } from "react-router-dom";
import s from './cardFavorite.module.css'

export default function CardFavorite({ name, genres, image, id, setUpdate, update }) {

  function handelDeleted() {
    let favorites = JSON.parse(localStorage.getItem("favorites"))
    let index = favorites.findIndex(e => e.id === id)
    favorites.splice(index, 1)
    localStorage.setItem("favorites", JSON.stringify(favorites))
    setUpdate(!update)
  }

  return (
    <div>
      <div className={s.containerFav}>
        <button className={s.fav} onClick={() => handelDeleted()}> ❤ </button>
      </div>
      <Link className={s.div} to={`/detail/${id}`} >
        <img className={s.img} src={image} alt={`${name}-imagen`} />
        <h3>{name}</h3>
        <h6>{genres.map(e => ` ${e} `)}</h6>
      </Link>
    </div>
  )
}