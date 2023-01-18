import React from "react";
import { useState } from "react";
import Card from "../card/card";
import CardFavorite from "../cardFavorite/cardFavorite";
import NavBar from "../navBar/navBar";
import s from './favorites.module.css'

export default function Favorites({ match }) {

  let [update, setUpdate] = useState(false)

  return (
    <div>
      <NavBar match={match} />
      <div className={s.container}>
        <div className={s.containerList}>

        </div>
        <div className={s.contarinerCard}>
          {JSON.parse(localStorage.getItem("favorites"))?.map(e => <CardFavorite key={e.id} name={e.name} genres={e.genres} image={e.image} id={e.id} setUpdate={setUpdate} update={update} />)}
        </div>
      </div>
    </div>
  )
}