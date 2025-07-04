import React, { useState } from "react";
import s from './Filtered.module.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { todosLosGeneros, ResetFilter, filter } from "../../redux/actions";
import { AiFillLinkedin, AiOutlineGithub, AiOutlineFilePdf } from "react-icons/ai"
import { BsFillBriefcaseFill } from "react-icons/bs";
import { Link } from 'react-router-dom'

export default function Filtered({ setCurrentPage, setUpdate, update, setInitial, setFinal }) {
  const dispatch = useDispatch()

  let generos = useSelector(s => s.genres)?.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
  const filtersActive = useSelector(s => s.filterValues)
  const allVideoGames = useSelector(s => s.videoGames)

  let [value, setValue] = useState({
    genre: filtersActive.genre ? filtersActive.genre : null,
    sort: filtersActive.sort ? filtersActive.sort : null,
    rating: filtersActive.rating ? filtersActive.rating : null,
    created: filtersActive.created
  })

  const handleFilter = (e) => {
    if (e.target.id === "created") {
      setValue(value = {
        ...value,
        created: !value.created
      })
    }
    if (e.target.name === "sort") {
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
            rating: null,
            sort: e.target.value
          })
          break;
        case "Z-A":
          setValue(value = {
            ...value,
            rating: null,
            sort: e.target.value
          })
          break;
        case "RatingASC":
          setValue(value = {
            ...value,
            sort: null,
            rating: e.target.value
          })
          break;
        case "RatingDES":
          setValue(value = {
            ...value,
            sort: null,
            rating: e.target.value
          })
          break;
        default:
      }
    }
    if (e.target.id === "genre") {
      if (e.target.value === value.genre) {
        setValue(
          value = {
            ...value,
            genre: null
          }
        )
      } else {
        setValue(value = {
          ...value,
          genre: e.target.value
        })
      }
    }
    resetPagination()
    dispatch(filter(value))
    setCurrentPage(1)
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
  }, [dispatch, generos.length])

  useEffect(() => {
    if (filtersActive?.sort)
      document.getElementById(filtersActive.sort).selected = "selected"
  }, [filtersActive?.sort])

  useEffect(() => {
    if (filtersActive?.rating)
      document.getElementById(filtersActive.rating).selected = "selected"
  }, [filtersActive?.rating])

  useEffect(() => {
    setUpdate(!update)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setUpdate])

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
                {generos?.map(e => <button key={e.id} id="genre" value={e.name} className={filtersActive?.genre === e.name
                  ? s.labelategoryActive
                  : s.labelategory} onClick={handleFilter} >{e.name}</button>)}
              </div>
            </div>
            <div className={s.containerSorts}>
              <h1>Sort:</h1>
              <select className={filtersActive?.sort || filtersActive?.rating ? s.selectSortActive : s.selectSort} name="sort" onChange={handleFilter}>
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
                <button className={filtersActive?.created
                  ? s.labelCreatedActive
                  : s.labelCreated} id="created" value={"false"} onClick={handleFilter}> Created </button>
              </div>
            </div>
            <div className={s.socials}>
              <a href="https://www.linkedin.com/in/fermin-solaberrieta-dev/" target="_blank" rel="noreferrer">
                <button className={s.icons}> < AiFillLinkedin /></button>
              </a>
              <a href="https://github.com/fermin234" target="_blank" rel="noreferrer">
                <button className={s.icons}>< AiOutlineGithub /></button>
              </a>
              <a href="https://portfolio-fermin234s-projects.vercel.app/" target="_blank" rel="noreferrer">
                <button className={s.iconsPorfolio}> <BsFillBriefcaseFill />Portfolio </button>
              </a>
            </div>
            <Link className={s.socials} to='/about'>
              <div>
                <h1>About</h1>
              </div>
            </Link>
          </>
          : undefined
        }

      </div>
    </>
  )

} 