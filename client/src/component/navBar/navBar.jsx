import React from "react";
import s from './navBar.module.css'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { VideoGameByName, desplegarFiltros } from "../../redux/actions";

import img from './img/4.png'
import Filtered from "../filtered/filtered";

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
    <div className={s.containerAll} >
      {/* <div className={s.div}>
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
          <div className={s.divLeftNavBar}>
            <Link to='/create'>
              <button> Create </button>
            </Link>
            <Link to='/favorites'>
              <button> Favorites </button>
            </Link>
          </div>
          : null}
      </div> */}
      <div className={s.containerFilter}>
        <Link className={s.link} to="/home">
          <label className={s.label}>{"<=="}</label>
        </Link>
        <h1>Filters</h1>
      </div>
      <div className={s.containterNavBar}>
        <Link className={s.link} to='/create'>
          <label className={s.label}>Create</label>
          {/* <button> Create </button> */}
        </Link>
        <form id="form" className={s.form} onSubmit={onHandelSubmit}>
          <input className={s.input} name='input' type="search" placeholder="Search Video Game" autoComplete="off" onChange={onHandleChange} />
        </form>
        <Link className={s.link} to='/favorites'>
          <label className={s.label}>Favorites</label>
        </Link>
      </div>
    </div>
  )
}