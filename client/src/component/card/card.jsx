import React from "react";
import { Link } from "react-router-dom";
import s from './card.module.css'

export default function Card({ name, genres, image, id }) {
  return (
    <Link className={s.div} to={`/detail/${id}`} >
      <div className={s.item}>
        <img className={s.img} src={image} alt={`${name}-imagen`} />
      </div>
      <div className={s.item}>
        <h3>{name}</h3>
      </div>
      <div className={s.item}>
        <h6>{genres.map(e => ` ${e} `)}</h6>
      </div>
    </Link>
  )
}