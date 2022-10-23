import React, { useState } from "react";
import s from './filtered.module.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { todosLosGeneros, filterViodeGamesByGenres, SortByAz } from "../../redux/actions";

export default function Filtered({ setCurrentPage }) {

  const prueba = useSelector(s => s.Filtered)

  const dispatch = useDispatch()
  const [ordenado, setOrdenado] = useState("")
  const filtredByGenre = document.getElementById("filtradoPorGenero")
  const filtredByA_Z = document.getElementById("filtradoAlfabeticamente")
  const filtredByRating = document.getElementById("filtradoRating")
  let generos = useSelector(s => s.genres).sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  useEffect(() => {
    dispatch(todosLosGeneros())
  }, [dispatch])

  function handlerFilterByGenres(e) {
    dispatch(filterViodeGamesByGenres(e.target.value))
  }

  function handleOnClick() {
    dispatch(filterViodeGamesByGenres("All Genres"))
    filtredByGenre.value = "All Genres"
    filtredByA_Z.value = "A-Z"
    filtredByRating.value = "Rating"
  }

  function handlerFilterByA_Z(e) {
    e.preventDefault()
    dispatch(SortByAz())
    setCurrentPage(1)
    setOrdenado(`Ordenado ${e.target.value}`)
  }

  function handlerFilterByRating(e) {
  }

  return (
    <div className={s.div}>
      <select className={s.slect} id="filtradoPorGenero" onChange={e => handlerFilterByGenres(e)}>
        <option value="All Genres">All Genres</option>
        {generos?.map(e => <option key={e.id} value={`${e.name}`}>{e.name}</option>)}
      </select>

      <select className={s.slect} id="filtradoAlfabeticamente" onChange={e => handlerFilterByA_Z(e)}>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="Creado">Creado</option>
      </select>

      <select className={s.slect} id="filtradoRating" onChange={e => handlerFilterByRating(e)}>
        <option value="Rating">Rating</option>
        <option value="RatingASC">Rating 🡱</option>
        <option value="RatingDES">Rating 🡳</option>
      </select>


      <button onClick={() => handleOnClick()}> Quitar filtros </button>
    </div>
  )
}