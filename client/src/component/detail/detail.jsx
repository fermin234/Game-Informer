import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VideoGameById } from "../../redux/actions";
import NavBar from "../navBar/navBar";
import s from './detail.module.css'

export default function Detail({ match }) {
  const dispatch = useDispatch()

  const id = match.params.id
  const videoGame = useSelector(state => state.detail)

  useEffect(() => {
    dispatch(VideoGameById(id))
  }, [dispatch, id])


  return (
    <>
      <NavBar match={match} />
      <div className={s.container}>
        <div className={s.item}>
          <h1>{videoGame.name}</h1>
        </div>
        <div className={s.item}>
          <img src={videoGame.background_image} alt="asdasd" />
        </div>
        <div className={s.item}>
          <span>{videoGame.description?.replace(/<[^>]*>/g, '')}</span>
        </div>
        <div className={s.item}>
          <h3>Released: </h3>
          <h4>{videoGame.released}</h4>
        </div>
        <div className={s.item}>
          <h3>Rating: </h3>
          <h4>{videoGame.rating}</h4>
        </div>
        <div className={s.item}>
          <h3>Platforms: </h3>
          <ul>{videoGame.platforms?.map(e => <li>{e}</li>)}</ul>
        </div>
      </div>
    </>)
}