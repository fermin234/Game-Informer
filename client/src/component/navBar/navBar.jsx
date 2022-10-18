import React from "react";
import s from './navBar.module.css'
import Filtered from "../filtered/filtered.jsx";
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { VideoGameByName } from "../../redux/actions";

export default function NavBar() {

  const dispatch = useDispatch()

  function onHandleSubmit(e) {
    e.preventDefault()
    if (e.target.value.length > 1)
      dispatch(VideoGameByName(e.target.value))
  }

  return (
    <>
      <div className={s.div}>
        <Link to='/home'>
          <h2>Home</h2>
        </Link>
        <form className={s.form} onSubmit={(e) => {
          // e.preventDefault()
          // dispatch(VideoGameByName(e.target.input.value));
          e.target.input.value = ''
        }}>
          <input onChange={e => onHandleSubmit(e)} name='input' className={s.input} type="search" placeholder="   🔎    Buscar Video Game" />
        </form>
        <Link to='/create'>
          <h2>Create</h2>
        </Link>
      </div>
      <div className={s.containerFiltered}>
        <Filtered />
      </div>
    </>
  )
}