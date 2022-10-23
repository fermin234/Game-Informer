import React from "react";
import { Link } from "react-router-dom";
import s from './card.module.css'

export default function Card({ name, genres, image, id }) {
  return (
    <div className={s.div}>
      <Link to={`/detail/${id}`}>
        <img className={s.img} src={image} alt={`${name}-imagen`} />
        <h1>{name}</h1>
        <h3>{genres.map(e => `${e} `)}</h3>
      </Link>
    </div>
  )
}