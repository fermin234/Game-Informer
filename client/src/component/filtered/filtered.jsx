import React, { useState } from "react";
import s from './filtered.module.css'
import "./filtered.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { todosLosGeneros, ResetFilter, filter } from "../../redux/actions";
import { AiFillLinkedin, AiOutlineGithub, AiOutlineFilePdf } from "react-icons/ai"
import { BsFillBriefcaseFill } from "react-icons/bs";

export default function Filtered({ setCurrentPage, setUpdate, update, setInitial, setFinal }) {
  const dispatch = useDispatch()

  let generos = useSelector(s => s.genres)?.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
  const filtersActive = useSelector(s => s.filterValues)
  const allVideoGames = useSelector(s => s.videoGames)

  let [value, setValue] = useState({
    genre: null,
    sort: null,
    rating: null,
    created: false
  })

  const handleFilter = (e) => {
    if (e.target.id === "created") {
      setValue(value = {
        ...value,
        created: !value.created
      })
    }
    else if (e.target.name === "sort") {
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
        {allVideoGames?.length
          ?
          <>
            <div className={s.filtersActive}>
              <h1>Actives:</h1>
              <div className={s.filtersActiveLabels}>
                {
                  filtersActive?.genre && <label className={s.labelategory}>{filtersActive.genre}</label>
                }
                {
                  filtersActive?.sort && <label className={s.labelategory}>{filtersActive.sort}</label>
                }
                {
                  filtersActive?.rating && <label className={s.labelategory}>{filtersActive.rating}</label>
                }
                {
                  filtersActive?.created && <label className={s.labelategory}>Create</label>
                }
                {
                  filtersActive?.genre || filtersActive?.sort || filtersActive?.rating || filtersActive?.created ? <button className={s.button} onClick={handleClearFilters}> X </button> : undefined
                }
              </div>
            </div>
            <div className={s.containerFilters}>
              <h1>By category:</h1>
              <div className={s.containerButtons}>
                {generos?.map(e => <label key={e.id} id={e.name} class={filtersActive?.genre == e.name
                  ? "labelategoryActive"
                  : "labelategory"} onClick={handleFilter} >{e.name}</label>)}
              </div>
            </div>
            <div className={s.containerSorts}>
              <h1>Sort:</h1>
              <select class={filtersActive?.sort || filtersActive?.rating ? "selectSortActive" : "selectSort"} name="sort" onChange={handleFilter}>
                <option className="option" id='1' value="null">Sort</option>
                <option name="alphabetical" id="A-Z" value="A-Z">A-Z</option>
                <option name="alphabetical" id="Z-A" value="Z-A">Z-A</option>
                <option className="option" id="RatingASC" value="RatingASC">Rating 🡱</option>
                <option className="option" id="RatingDES" value="RatingDES">Rating 🡳</option>
              </select>
            </div>
            <div className={s.byCreated}>
              <h1>By created:</h1>
              <div className={s.containerLabelCreated}>
                <label class={filtersActive?.created
                  ? "labelCreatedActive"
                  : "labelCreated"} id="created" onClick={handleFilter}> Created </label>
              </div>
            </div>
            <div className={s.socials}>
              <a href="https://www.linkedin.com/in/fermin-solaberrieta/" target="_blank">
                <button className={s.icons}> < AiFillLinkedin /></button>
              </a>
              <a href="https://github.com/fermin234" target="_blank">
                <button className={s.icons}>< AiOutlineGithub /></button>
              </a>
              <a href="https://www.canva.com/design/DAFL8tvQGrg/WqNwT4FWhdG38MG0DnHduA/view?utm_content=DAFL8tvQGrg&utm_campaign=designshare&utm_medium=link&utm_source=publishsharelink" target="_blank">
                <button className={s.iconsPorfolio}> <AiOutlineFilePdf /> CV </button>
              </a>
              <a href="#">
                <button className={s.iconsPorfolio}> <BsFillBriefcaseFill />Portfolio </button>
              </a>
            </div>
          </>
          : undefined
        }

      </div>
    </>
  )

} 