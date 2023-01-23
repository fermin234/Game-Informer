import React from "react";
import { Link } from "react-router-dom";
import s from './Card.module.css'
import axios from 'axios'
import { useDispatch } from "react-redux";

export default function Card({ name, genres, image, id, created }) {

  const dispatch = useDispatch()
  let butonFav = document.getElementsByName(`buttonFav${id}`)
  let favorites = JSON.parse(localStorage.getItem("favorites"))

  function handleFavorite() {
    let favorites = JSON.parse(localStorage.getItem("favorites"))
    if (favorites.find(e => e.id === id)) {
      let index = favorites.findIndex(e => e.id === id)
      favorites.splice(index, 1)
      localStorage.setItem("favorites", JSON.stringify(favorites))
      butonFav[0].innerHTML = "🤍"
    } else {
      favorites = [...favorites, { name, genres, image, id }]
      localStorage.setItem("favorites", JSON.stringify(favorites))
      butonFav[0].innerHTML = "❤"
    }
  }

  async function handleDelete(id) {
    const result = await axios.delete(`videogames/deleteVideoGame/${id}`)
  }

  return (
    <div className={s.card} >
      <div className={s.containerFav}>
        <button name={`buttonFav${id}`} className={s.fav} onClick={() => handleFavorite()}> {
          favorites.find(e => e.id === id) ? "❤" : "🤍"
        } </button>
      </div>
      <Link className={s.link} to={`/detail/${id}`} >
        <img className={s.img} src={image} alt={`${name}-imagen`} />
        <h3 className={s.name}>{name}</h3>
      </Link>
      <div className={s.labels}>{genres.length > 3 ?
        genres.slice(0, 3).map(e => <label key={Math.random() * 100}>{e}</label>)
        : genres.map(e => <label key={Math.random() * 100}>{e}</label>)}</div>
      {
        created ? <button className={s.deletedButton} onClick={() => handleDelete(id)}> Delete </button> : undefined
      }
    </div>
  )
}