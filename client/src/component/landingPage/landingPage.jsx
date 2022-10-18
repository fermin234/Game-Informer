import React from "react";
import s from './landingPage.module.css'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className={s.div}>
      <Link to='/home'>
        <button className={s.button}> Entrar </button>
      </Link>
    </div>
  )
} 