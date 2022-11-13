import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Card from "../card/card";
import NavBar from "../navBar/navBar";
import s from './favorites.module.css'

export default function Favorites({ match }) {

  const [favs, setFavs] = useState([])

  const dispatch = useDispatch()
  if (localStorage.length)
    for (const key in localStorage) {
      favs.push(JSON.parse(localStorage.getItem(key)))
    }


  function removeFav() {
    localStorage.clear()
    setFavs([])
  }

  return (
    <>
      <NavBar match={match} />
      <div className={s.containerCardsFav}>
        {favs?.map(e => e !== null ? <Card key={e.id} name={e.name} genres={e.genres} image={e.image} /> : null)}
      </div>
      <button onClick={() => removeFav()}>Eliminar todos los favoritos</button>
    </>
  )
}