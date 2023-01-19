import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CardFavorite from "../cardFavorite/cardFavorite";
import NavBar from "../navBar/navBar";
import s from './favorites.module.css'

export default function Favorites({ match, history }) {

  let [update, setUpdate] = useState(false)
  const favorites = JSON.parse(localStorage.getItem("favorites"))


  function handelDeleted(e) {
    const id = e.target.id
    let favorites = JSON.parse(localStorage.getItem("favorites"))
    let index = favorites.findIndex(e => e.id == id)
    const result = window.confirm(`Desea eliminar ${favorites[index].name} de su lista de favoritos?`)
    if (result) {
      favorites.splice(index, 1)
      localStorage.setItem("favorites", JSON.stringify(favorites))
      setUpdate(!update)
    }
  }

  function handleClearFavs() {
    const result = window.confirm(`Desea eliminar todos sus favoritos?`)
    if (result) {
      localStorage.clear()
      setUpdate(!update)
    }
  }

  useEffect(() => {
  }, [update])

  return (
    <div>
      <NavBar match={match} />
      <div className={s.container}>
        <div className={s.containerList}>
          {
            favorites?.map(e =>
              <div className={s.item}>
                <div className={s.span}>
                  <span>{e.name}</span>
                </div>
                <div>
                  <button className={s.delete} id={e.id} onClick={handelDeleted}> X </button>
                </div>
              </div>)
          }
          <button className={s.removeFavs} onClick={handleClearFavs}> Eliminar todos los favoritos </button>
        </div>
        <div className={s.contarinerCard}>
          {
            !favorites?.length ?
              <div >
                <h1 className={s.error}>Usted no a agregado ningun juego a sus favoritos.</h1>
                <br />
                <br />
                <h1 className={s.error}>Redireccionando a la pagina principal...</h1>
                {setTimeout(() => {
                  history.push("/home")
                }, 5000)}
              </div>
              : undefined
          }
          {favorites?.map(e => <CardFavorite key={e.id} name={e.name} genres={e.genres} image={e.image} id={e.id} setUpdate={setUpdate} update={update} />)}
        </div>
      </div>
    </div>
  )
}