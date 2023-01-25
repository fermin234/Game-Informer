import React from "react";
import s from './NavBar.module.css'
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { VideoGameByName } from "../../redux/actions";

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
    <div className={s.containerAll} >
      <div className={s.containerFilter}>
        {match.path !== "/home" &&
          <Link className={s.link} to="/home">
            <label className={s.label}>
              <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg></label>
          </Link>
        }
        {match.path === "/home" &&
          <label className={s.label}>Filters</label>
        }
        {match.path === "/favorites" &&
          <h1>List</h1>
        }
      </div>
      <div className={s.containterNavBar}>
        <Link className={s.link} to='/create'>
          <label className={s.label}>Create</label>
        </Link>
        {
          match.path === "/home" &&
          <form id="form" className={s.form} onSubmit={onHandelSubmit}>
            <input className={s.input} name='input' type="search" placeholder="Search Video Game" autoComplete="off" onChange={onHandleChange} />
          </form>
        }
        <Link className={s.link} to='/favorites'>
          <label className={s.label} >Favorites</label>
        </Link>
      </div>
    </div>
  )
}