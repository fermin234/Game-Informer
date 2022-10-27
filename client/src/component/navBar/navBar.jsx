import React from "react";
import s from './navBar.module.css'
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { VideoGameByName } from "../../redux/actions";

import img from './img/4.png'

export default function NavBar({ match, setCurrentPage }) {

  const dispatch = useDispatch()
  const form = document.getElementById("form")

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
        <Link className={s.nav} to='/home'>
          <img src={img} alt="logo" />
        </Link>

        {match.url === "/home" ?
          <form id="form" className={s.form} onSubmit={onHandelSubmit}>
            <input className={s.input} name='input' type="search" placeholder="    🔎    Buscar Video Game" autoComplete="off" onChange={onHandleChange} />
            {/* <svg xmlns="http://www.w3.org/2000/svg"  >
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg> */}
          </form>
          : null}

        {match.url === "/home" ?
          <Link to='/create'>
            <button>Create</button>
          </Link>
          : null}
      </div>
    </>
  )
}