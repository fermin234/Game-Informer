import React, { useState } from "react";
import s from './filtered.module.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { todosLosGeneros, filterViodeGamesByGenres, SortByAz, ResetFilter, allVideoGames, SortByRating, filterByCreate } from "../../redux/actions";

export default function Filtered({ setCurrentPage, setOrden }) {

  const dispatch = useDispatch()
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
    setCurrentPage(1)
    setOrden(`Ordenado por ${e.target.value}`)
  }

  function handleOnClick(e) {
    dispatch(allVideoGames())
    dispatch(ResetFilter())
    setCurrentPage(1)
    setOrden(`Ordenado por ${e.target.value}`)
    filtredByGenre.value = "All Genres"
    filtredByA_Z.value = "Ordenamiento"
    filtredByRating.value = "Rating"
  }

  function handlerFilterByA_Z(e) {
    dispatch(SortByAz(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado por ${e.target.value}`)
  }

  function handlerFilterByRating(e) {
    dispatch(SortByRating(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado por ${e.target.value}`)
  }

  function handlerFilterByCreate(e) {
    e.preventDefault()
    dispatch(filterByCreate())
    setCurrentPage(1)
    setOrden(`Ordenado por creacion`)
  }


  return (
    <div className={s.div}>
      <select className={s.slect} id="filtradoPorGenero" onChange={handlerFilterByGenres}>
        <option value="All Genres">All Genres</option>
        {generos?.map(e => <option key={e.id} value={`${e.name}`}>{e.name}</option>)}
      </select>

      <select className={s.slect} id="filtradoAlfabeticamente" onChange={handlerFilterByA_Z}>
        <option value="Ordenamiento">Ordenamiento</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        {/* <option value="Creado">Creado</option> */}
      </select>

      <select className={s.slect} id="filtradoRating" onChange={handlerFilterByRating}>
        <option value="Rating">Rating</option>
        <option value="RatingASC">Rating 🡱</option>
        <option value="RatingDES">Rating 🡳</option>
      </select>

      <button onClick={handlerFilterByCreate}> Creado </button>

      <button onClick={handleOnClick}> Quitar filtros </button>
    </div>
  )
}