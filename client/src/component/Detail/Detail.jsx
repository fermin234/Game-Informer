import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResetCreate, VideoGameById } from "../../redux/actions";
import ModalImage from "../Modals/ModalImage";
import NavBar from "../NavBar/NavBar";
import s from './Detail.module.css'
import { useModal } from "../../hooks/useModal";


export default function Detail({ match }) {
  const dispatch = useDispatch()

  const id = match.params.id
  const videoGame = useSelector(state => state.detail)
  const [images, setImages] = useState([])
  const [srcImage, setSrcImage] = useState(null)
  const [isOpen, openModal, closeModal] = useModal()

  async function getImages() {
    const result = await axios.get(`/videogames/screenShots/${id}`)
    setImages(result.data)
  }

  function handleChangeImage(e) {
    document.getElementById("image").src = e.target.src
    openModal()
  }

  useEffect(() => {
    dispatch(VideoGameById(id))
    getImages()
    setSrcImage(videoGame?.background_image)
    return dispatch(ResetCreate())
  }, [dispatch, id])


  return (
    <div>
      <NavBar match={match} />
      <ModalImage isOpen={isOpen} closeModal={closeModal}>
        <img id="image" className={s.imageModal} src={srcImage} alt="" />
      </ModalImage>
      {Object.entries(videoGame).length ?
        <div className={s.container} key={videoGame.id}>
          <div className={s.item}>
            <h1>{videoGame.name}</h1>
          </div>
          <div className={s.item}>
            <img className={s.imageDetail} src={videoGame.background_image} onClick={handleChangeImage} alt="Video-Game" />
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
            <ul>{videoGame.platforms?.map(e => <li key={e}>{e}</li>)}</ul>
          </div>
          <div className={s.item}>
            {
              images.length ?
                images.map(e => (<img key={e} onClick={handleChangeImage} src={e} alt="asdasd" />))
                : undefined
            }
          </div>
        </div>
        : <div className={s.loader}></div>
      }

    </div>)
}