import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ResetCreate, VideoGameById } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import s from './Detail.module.css'

export default function Detail({ match }) {
  const dispatch = useDispatch()

  const id = match.params.id
  const videoGame = useSelector(state => state.detail)
  const [boolean, setBoolean] = useState(false)
  const [images, setImages] = useState([])
  const [srcImage, setSrcImage] = useState(null)

  async function getImages() {
    const result = await axios.get(`/videogames/screenShots/${id}`)
    setImages(result.data)
  }

  function handleChangeImage(e) {
    document.getElementById("image").src = e.target.src
    window.scrollTo({ top: 250, left: 0, behavior: 'smooth' });
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
      {Object.entries(videoGame).length ?
        boolean ?
          <div className={s.containerImg}>
            <label className={s.buttonCloseImages} onClick={() => { setBoolean(false) }}>
              <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg></label>
            <div className={s.containerSmallImgs}>
              <div>
                <h1>{videoGame?.name}</h1>
              </div>
              <div className={s.contarnerCardsImag}>
                {
                  images.length ?
                    images.map(e => (<img key={e} className={s.smallImgs} onClick={handleChangeImage} src={e} alt="asdasd" />))
                    : undefined
                }
              </div>
            </div>
            <div className={s.containerImgs}>
              <img className={s.imgs} id="image" src={videoGame.background_image} alt="ImageVideoGame" />
            </div>
          </div>
          :
          <div className={s.container} key={videoGame.id}>
            <div className={s.item}>
              <h1>{videoGame.name}</h1>
            </div>
            <div className={s.item}>
              <img className={s.imageDetail} src={videoGame.background_image} onClick={() => { setBoolean(true) }} alt="asdasd" />
              <button onClick={() => { setBoolean(true) }}>Show more images</button>
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
          </div>
        : <div className={s.loader}></div>
      }

    </div>)
}