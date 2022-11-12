import React from "react";
import s from './navBar.module.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { VideoGameByName, desplegarFiltros } from "../../redux/actions";

import img from './img/4.png'

export default function NavBar({ match, setCurrentPage }) {

  const dispatch = useDispatch()
  const form = document.getElementById("form")
  const allVideoGames = useSelector(s => s.filtred)

  function onHandleChange(e) {
    e.preventDefault()
    if (!e.target.value.length)
      dispatch(VideoGameByName(e.target.value))
    if (e.target.value.length > 1) {
      setCurrentPage(1)
      dispatch(VideoGameByName(e.target.value))
    }
  }

  function onHandelSubmit(e) {
    e.preventDefault()
    form.reset()
  }
  return (
    <>
      <div className={s.div}>
        {match.url !== "/home" && match.url !== "/detail" ?
          <Link className={s.home} to='/home'>
            <img src={img} alt="logo" />
          </Link>
          : <button onClick={() => {
            dispatch(desplegarFiltros())
          }
          } disabled={allVideoGames.length ? false : true}> Filters </button>
        }

        {match.url === "/home" ?
          <div className={s.containerSearch}>
            <svg className={s.loupin} xmlns="http://www.w3.org/2000/svg"  >
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
            <form id="form" className={s.form} onSubmit={onHandelSubmit}>
              <input className={s.input} name='input' type="search" placeholder="Search Video Game" autoComplete="off" onChange={onHandleChange} />
            </form>
          </div>
          : null}

        {match.url === "/home" ?
          <Link to='/create'>
            <button> Create </button>
          </Link>
          : null}
      </div>
    </>
  )
}