import React from "react";
import s from './filtered.module.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { todosLosGeneros, filterViodeGamesByGenres, SortByAz, ResetFilter, allVideoGames, SortByRating, filterByCreate } from "../../redux/actions";
import { useState } from "react";

export default function Filtered({ setCurrentPage, setOrden, setInitial, setFinal }) {

  const dispatch = useDispatch()
  let filtredByGenre = document.getElementById("filtradoPorGenero")
  let filtredByA_Z = document.getElementById("filtradoAlfabeticamente")
  let filtredByRating = document.getElementById("filtradoRating")

  const [boolean, setBoolean] = useState(false)

  let todosLosVideoGames = useSelector(s => s.videoGames)
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
    if (!generos.length)
      dispatch(todosLosGeneros())
    filtredByGenre = document.getElementById("filtradoPorGenero")
    filtredByA_Z = document.getElementById("filtradoAlfabeticamente")
    filtredByRating = document.getElementById("filtradoRating")
  }, [dispatch, filtredByGenre, filtredByA_Z, filtredByRating, boolean])

  function handlerFilterByGenres(e) {
    resetPagination()
    dispatch(filterViodeGamesByGenres(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado por ${e.target.value}`)
  }

  function handlerOnClick(e) {
    resetPagination()
    dispatch(ResetFilter())
    setCurrentPage(1)
    setOrden(`Ordenado por ${e.target.value}`)
    filtredByGenre.value = "All Genres"
    filtredByA_Z.value = "Ordenamiento"
    filtredByRating.value = "Rating"
  }

  function handlerFilterByA_Z(e) {
    resetPagination()
    dispatch(SortByAz(e.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado por ${e.target.value}`)
  }

  function handlerFilterByRating(e) {
    resetPagination()
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

  function resetPagination() {
    setInitial(1)
    setFinal(8)
  }



  return (
    <div className={s.containerAll}>
      <div className={s.containerButtonFiltros}>
        <button className={s.filtros} onClick={() => setBoolean(!boolean)}>
          Filtros
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" width="16" height="16" focusable="false">
            <path d="M5 15l4.61-7L5 1h2.39L12 8l-4.61 7z"></path>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" width="16" height="16" focusable="false">
            <path d="M5 15l4.61-7L5 1h2.39L12 8l-4.61 7z"></path>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" width="16" height="16" focusable="false">
            <path d="M5 15l4.61-7L5 1h2.39L12 8l-4.61 7z"></path>
          </svg>
        </button>
      </div>
      {
        todosLosVideoGames.length && boolean &&
        <div className={s.slideInLeft}>
          <select className={s.slect} id="filtradoPorGenero" onChange={handlerFilterByGenres}>
            <option value="All Genres">All Genres</option>
            {generos?.map(e => <option key={e.id} value={`${e.name}`}>{e.name}</option>)}
          </select>

          <select className={s.slect} id="filtradoAlfabeticamente" onChange={handlerFilterByA_Z}>
            <option value="Ordenamiento">Sort</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>

          <select className={s.slect} id="filtradoRating" onChange={handlerFilterByRating}>
            <option value="Rating">Rating</option>
            <option value="RatingASC">Rating 🡱</option>
            <option value="RatingDES">Rating 🡳</option>
          </select>

          <button onClick={handlerFilterByCreate}> Created </button>

          <button onClick={handlerOnClick}> Remove filters </button>
        </div>
      }

    </div>

  )
} 