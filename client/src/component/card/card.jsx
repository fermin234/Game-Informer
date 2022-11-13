import React from "react";
import { Link } from "react-router-dom";
import s from './card.module.css'

export default function Card({ name, genres, image, id }) {

  return (
    <div>
      <div className={s.containerFav}>
        <button className={s.fav} onClick={() => localStorage.setItem(id, JSON.stringify({ name, genres, image, id }))}> ❤ </button>
      </div>
      <Link className={s.div} to={`/detail/${id}`} >
        <img className={s.img} src={image} alt={`${name}-imagen`} />
        <h3>{name}</h3>
        <h6>{genres.map(e => ` ${e} `)}</h6>
      </Link>
    </div>
  )
}