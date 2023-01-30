import React from "react";
import s from './LandingPage.module.css'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className={s.div}>
      <Link className={s.link} to='/home'>
        <button className={s.button}> Join the Game! </button>
      </Link>
    </div>
  )
} 