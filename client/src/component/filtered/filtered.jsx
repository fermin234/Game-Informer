import React, { useState } from "react";
import s from './filtered.module.css'
import "./filtered.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { todosLosGeneros, ResetFilter, desplegarFiltros, filter } from "../../redux/actions";

export default function Filtered({ setCurrentPage, setUpdate, update, setInitial, setFinal }) {
  const dispatch = useDispatch()

  let boolean = useSelector(s => s.desplegarFiltros)
  let generos = useSelector(s => s.genres)?.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
  const filtersActive = useSelector(s => s.filterValues)

  let [value, setValue] = useState({
    genre: null,
    sort: null,
    rating: null,
    created: false
  })

  // let value = {
  //   genre: null,
  //   sort: null,
  //   rating: null,
  //   created: false
  // }


  // const handleFilter = (e) => {
  //   if (e.target.name === "created") {
  //     setValue({
  //       ...value,
  //       [e.target.name]: !value.created
  //     })
  //   } else if (e.target.value === "null") {
  //     setValue({
  //       ...value,
  //       [e.target.name]: null
  //     })
  //   } else {
  //     setValue({
  //       ...value,
  //       [e.target.name]: e.target.value
  //     })
  //   }
  // }

  const handleFilter = (e) => {
    if (e.target.name === "created") {
      setValue(value = {
        ...value,
        created: !value.created
      })
    } else if (e.target.name === "sort") {
      switch (e.target.value) {
        case "null":
          setValue(value = {
            ...value,
            sort: null,
            rating: null
          })
          break;
        case "A-Z":
          setValue(value = {
            ...value,
            sort: e.target.value
          })
          break;
        case "Z-A":
          setValue(value = {
            ...value,
            sort: e.target.value
          })
          break;
        case "RatingASC":
          setValue(value = {
            ...value,
            rating: e.target.value
          })
          break;
        case "RatingDES":
          setValue(value = {
            ...value,
            rating: e.target.value
          })
          break;
      }
    } else if (e.target.id === value.genre) {
      setValue(
        value = {
          ...value,
          genre: null
        }
      )
    } else {
      setValue(value = {
        ...value,
        genre: e.target.id
      })
    }
    dispatch(filter(value))
  }

  function handleClearFilters() {
    resetPagination()
    dispatch(ResetFilter())
    setCurrentPage(1)
    document.getElementById("1").selected = "selected"
    setValue(value = {
      genre: null,
      sort: null,
      rating: null,
      created: false
    })
    setUpdate(!update)
  }

  function resetPagination() {
    setInitial(1)
    setFinal(8)
  }

  useEffect(() => {
    if (!generos.length)
      dispatch(todosLosGeneros())
    setUpdate(!update)
    if (filtersActive?.sort)
      document.getElementById(filtersActive.sort).selected = "selected"
    if (filtersActive?.rating)
      document.getElementById(filtersActive.rating).selected = "selected"

  }, [dispatch])

  return (
    <>
      <div className={s.containerAll}>
        <div className={s.filtersActive}>
          <h1>Actives:</h1>
          <div className={s.filtersActiveLabels}>
            {
              filtersActive?.genre && filtersActive?.sort && filtersActive?.created ?
                <>
                  <label className={s.labelategory}>{filtersActive.genre}</label>
                  <label className={s.labelategory}>{filtersActive.sort}</label>
                  <label className={s.labelategory}>Created</label>
                  <button className={s.button} onClick={handleClearFilters}> X </button>
                </>
                : filtersActive?.genre && filtersActive?.rating && filtersActive?.created ?
                  <>
                    <label className={s.labelategory}>{filtersActive.genre}</label>
                    <label className={s.labelategory}>{filtersActive.sort}</label>
                    <label className={s.labelategory}>Created</label>
                    <button className={s.button} onClick={handleClearFilters}> X </button>
                  </>
                  : filtersActive?.genre && filtersActive?.sort ?
                    <>
                      <label className={s.labelategory}>{filtersActive.genre}</label>
                      <label className={s.labelategory}>{filtersActive.sort}</label>
                      <button className={s.button} onClick={handleClearFilters}> X </button>
                    </>
                    : filtersActive?.genre && filtersActive?.rating ?
                      <>
                        <label className={s.labelategory}>{filtersActive.genre}</label>
                        <label className={s.labelategory}>{filtersActive.rating}</label>
                        <button className={s.button} onClick={handleClearFilters}> X </button>
                      </>
                      : filtersActive?.genre && filtersActive?.created ?
                        <>
                          <label className={s.labelategory}>{filtersActive.genre}</label>
                          <label className={s.labelategory}>Created</label>
                          <button className={s.button} onClick={handleClearFilters}> X </button>
                        </>
                        : filtersActive?.rating && filtersActive?.created ?
                          <>
                            <label className={s.labelategory}>{filtersActive.rating}</label>
                            <label className={s.labelategory}>Created</label>
                            <button className={s.button} onClick={handleClearFilters}> X </button>
                          </>
                          : filtersActive?.sort && filtersActive?.created ?
                            <>
                              <label className={s.labelategory}>{filtersActive.sort}</label>
                              <label className={s.labelategory}>Created</label>
                              <button className={s.button} onClick={handleClearFilters}> X </button>
                            </>
                            : filtersActive?.genre ?
                              <>
                                <label className={s.labelategory}>{filtersActive.genre}</label>
                                <button className={s.button} onClick={handleClearFilters}> X </button>
                              </>
                              : filtersActive?.created ?
                                <>
                                  <label className={s.labelategory}>Created</label>
                                  <button className={s.button} onClick={handleClearFilters}> X </button>
                                </>
                                : filtersActive?.sort ?
                                  <>
                                    <label className={s.labelategory}>{filtersActive.sort}</label>
                                    <button className={s.button} onClick={handleClearFilters}> X </button>
                                  </>
                                  : filtersActive?.rating &&
                                  <>
                                    <label className={s.labelategory}>{filtersActive.rating}</label>
                                    <button className={s.button} onClick={handleClearFilters}> X </button>
                                  </>
            }
          </div>
        </div>
        <div className={s.containerFilters}>
          <h1>By category</h1>
          <div className={s.containerButtons}>
            {generos?.map(e => <label key={e.id} id={e.name} class={filtersActive?.genre == e.name
              ? "labelategoryActive"
              : "labelategory"} onClick={handleFilter} >{e.name}</label>)}
          </div>
        </div>
        <div className={s.containerSorts}>
          <h1>Sort</h1>
          <select className={s.selectSort} name="sort" onChange={handleFilter}>
            <option className="option" id='1' value="null">Sort</option>
            <option name="alphabetical" id="A-Z" value="A-Z">A-Z</option>
            <option name="alphabetical" id="Z-A" value="Z-A">Z-A</option>
            <option className="option" id="RatingASC" value="RatingASC">Rating 🡱</option>
            <option className="option" id="RatingDES" value="RatingDES">Rating 🡳</option>
          </select>
        </div>
        <div className={s.byCreated}>
          <h1>By created</h1>
          <button name="created" onClick={handleFilter}> Created </button>
        </div>
        {/* <select className={s.slect} name="rating" onChange={handleFilter}>
          <option className="option" id="3" value="null">Rating</option>
          <option className="option" value="RatingASC">Rating 🡱</option>
          <option className="option" value="RatingDES">Rating 🡳</option>
        </select> */}
      </div>
    </>
  )

} 