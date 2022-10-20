import React from "react";
import s from './landingPage.module.css'
import { Link } from 'react-router-dom'
import img from './img/10.jpg'

export default function LandingPage() {
  return (<>
    <img className={s.img} src={img} alt="imagen-de-carga" />
    {/* <div className={s.div}> */}
    <Link to='/home'>
      <button className={s.button}> Entrar </button>
    </Link>
    {/* </div> */}
  </>
  )
} 