import React from "react";
import s from './landingPage.module.css'
import { Link } from 'react-router-dom'
import img from './img/12.jpg'

export default function LandingPage() {
  return (
    <div className={s.div}>
      <img src={img} alt="imagen-de-carga" />
      <Link to='/home'>
        <button> Join the Game! </button>
      </Link>
    </div>
  )
} 