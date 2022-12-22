import React, { useState } from "react";
import s from './filtered.module.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { todosLosGeneros, ResetFilter, desplegarFiltros, filter } from "../../redux/actions";

export default function Filtered({ setCurrentPage, setUpdate, update, setInitial, setFinal }) {
  const dispatch = useDispatch()

  let boolean = useSelector(s => s.desplegarFiltros)
  let generos = useSelector(s => s.genres).sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)

  const [value, setValue] = useState({
    genre: null,
    sort: null,
    rating: null,
    created: false
  })

  const handleFilter = (e) => {
    if (e.target.name === "created") {
      setValue({
        ...value,
        [e.target.name]: !value.created
      })
    } else if (e.target.value === "null") {
      setValue({
        ...value,
        [e.target.name]: null
      })
    } else {
      setValue({
        ...value,
        [e.target.name]: e.target.value
      })
    }
  }

  function handlerOnClick(e) {
    resetPagination()
    dispatch(ResetFilter())
    setCurrentPage(1)
    setUpdate(!update)
    document.getElementById("1").selected = "selected"
    document.getElementById("2").selected = "selected"
    document.getElementById("3").selected = "selected"
  }

  function resetPagination() {
    setInitial(1)
    setFinal(8)
  }

  useEffect(() => {
    if (!generos.length)
      dispatch(todosLosGeneros())
    dispatch(filter(value)) //ARREGLAR ASINCRONISMO
    setUpdate(!update)
  }, [dispatch, value])

  return (
    <>

      {
        boolean &&
        <div className={s.containerAll}>
          <div className={s.containerButton}>
            <button className={s.cerrarFiltros}
              onClick={() => {
                dispatch(desplegarFiltros())
              }}> X </button>
          </div>
          <div className={s.slideInLeft}>
            <select className={s.slect} name="genre" onChange={handleFilter}>
              <option className="option" id="1" value="null">All Genres</option>
              {generos?.map(e => <option className="option" key={e.id} value={`${e.name}`}>{e.name}</option>)}
            </select>

            <select className={s.slect} name="sort" onChange={handleFilter}>
              <option className="option" id="2" value="null">Sort</option>
              <option className="option" value="A-Z">A-Z</option>
              <option className="option" value="Z-A">Z-A</option>
            </select>

            <select className={s.slect} name="rating" onChange={handleFilter}>
              <option className="option" id="3" value="null">Rating</option>
              <option className="option" value="RatingASC">Rating 🡱</option>
              <option className="option" value="RatingDES">Rating 🡳</option>
            </select>

            <button className={s.buttonsFilters} name="created" onClick={handleFilter}> Created </button>

            <button className={s.buttonsFilters} onClick={handlerOnClick}> Remove filters </button>
          </div>
        </div>
      }

    </>
  )

} 