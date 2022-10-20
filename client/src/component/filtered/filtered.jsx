import React from "react";
import s from './filtered.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import { todosLosGeneros, filterViodeGamesByGenres } from "../../redux/actions";

export default function Filtered() {

  const dispatch = useDispatch()
  let generos = useSelector(s => s.genres).sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });

  // const allVideoGames = useSelector(s => s.createVideoGame)

  useEffect(() => {
    dispatch(todosLosGeneros())
  }, [dispatch])

  function handlerFilterByGenres(e) {
    dispatch(filterViodeGamesByGenres(e.target.value))
    // console.log(allVideoGames);
  }

  return (
    <div className={s.div}>
      <select className={s.slect} name="FiltradoPorGenero" onChange={e => handlerFilterByGenres(e)}>
        <option value="All Genres">All Genres</option>
        {generos?.map(e => <option key={e.id} value={`${e.name}`}>{e.name}</option>)}
      </select>
      <select className={s.slect} name="FiltradoAlfabeticamente/Rating">
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="Rating🡱">Rating 🡱</option>
        <option value="Rating🡳">Rating 🡳</option>
        <option value="Creado">Creado</option>
      </select>
    </div>
  )
}