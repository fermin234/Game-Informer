import React from "react";
import s from './navBar.module.css'
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { VideoGameByName } from "../../redux/actions";

export default function NavBar() {

  const dispatch = useDispatch()
  const form = document.getElementById("form")

  function onHandleChange(e) {
    e.preventDefault()
    if (e.target.value.length > 1)
      dispatch(VideoGameByName(e.target.value))
  }

  function onHandelSubmit(e) {
    e.preventDefault()
    form.reset()
  }

  return (
    <>
      <div className={s.div}>
        <Link to='/home'>
          <h2>Home</h2>
        </Link>
        <form id="form" className={s.form} onSubmit={onHandelSubmit}>
          <input onChange={onHandleChange} name='input' className={s.input} type="search" placeholder="    🔎    Buscar Video Game" />
        </form>
        <Link to='/create'>
          <h2>Create</h2>
        </Link>
      </div>
    </>
  )
}