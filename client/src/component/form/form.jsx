import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createVideoGame, ResetFilter, allVideoGames } from "../../redux/actions";
import NavBar from "../NavBar/NavBar";
import s from './Form.module.css'
import Validate from "./validate.js";
import * as allImages from '../../assets/iconsGenres'
import { useModal } from "../../hooks/useModal";
import ModalInformation from "../Modals/ModalInformation";

export default function Form(props) {

  const dispatch = useDispatch()
  !localStorage.getItem("form") && localStorage.setItem("form", "{}")
  const [form, setForm] = useState(JSON.parse(localStorage.getItem("form")))

  const [input, setInput] = useState({
    name: form?.name ? form.name : "",
    description: form?.description ? form.description : "",
    released: form?.released ? form.released : "",
    rating: form?.rating ? form.rating : null,
    platforms: form?.platforms ? form.platforms : [],
    genres: form?.genres?.length ? form.genres : [],
    image: form?.image ? form.image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSch19yXTth6yL5J-SU6FafjJAUv1C1ptwziIyqk_3Skw&s.png",
    created: form?.created ? form.created : true
  })
  const images = []
  const [isOpen, openModal, closeModal] = useModal()



  for (const e in allImages) {
    images.push(allImages[e])
  }

  const [errors, setErrors] = useState({})

  function handleSubmit(e) {
    e.preventDefault()
    if (Object.entries(errors).length) {
      return openModal()
    }
    dispatch(createVideoGame(input))
    dispatch(allVideoGames())
    dispatch(ResetFilter())
    resetForm(e)

    alert(`${input.name} creado exitosamente.`)

    setInput({
      name: "",
      description: null,
      released: "",
      rating: null,
      platforms: [],
      genres: [],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSch19yXTth6yL5J-SU6FafjJAUv1C1ptwziIyqk_3Skw&s.png",
      created: true
    })
  }

  function onHandleChange(e) {
    if (e.target.name === "platforms") {
      setInput({
        ...input,
        platforms: e.target.value.split(" "),
      })
    } else if (e.target.name === "genres") {
      if (input.genres.includes(e.target.id)) {
        console.log('entra al if')
        const id = e.target.id
        let arr = input.genres
        const index = arr.findIndex(e => e === id)
        arr.splice(index, 1)
        // let form = JSON.parse(localStorage.getItem("form"))
        // form.genres = arr
        // localStorage.setItem("form", JSON.stringify(form))
        setInput({
          ...input,
          genres: arr
        })

      } else {
        setInput({
          ...input,
          genres: [...input.genres, e.target.id],
        })
      }
    } else if (e.target.name === "rating") {
      setInput({
        ...input,
        rating: parseFloat(e.target.value),
      })
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value
      })
    }
  }

  useEffect(() => {
    setErrors(Validate(input))
    localStorage.setItem("form", JSON.stringify(input))
  }, [input])

  function resetForm(e) {
    e.target.name.value = ''
    e.target.description.value = ''
    e.target.rating.value = ''
    e.target.released.value = ''
    e.target.platforms.value = ''
    e.target.image.value = ''
  }

  return (
    <>
      <NavBar match={props} />
      <div className={s.containerAll}>
        <ModalInformation isOpen={isOpen} closeModal={closeModal}>
          <h2>{Object.values(errors)[0]}</h2>
        </ModalInformation>
        <form className={s.form} onSubmit={handleSubmit} method="post" id="form">
          {/* Name */}
          <label htmlFor="">*Name:</label>
          <input type="text" name="name" autoComplete="off" placeholder="Counter Strike 1.6" onChange={onHandleChange}
            value={input.name && input.name} />

          {/* Description */}
          <label htmlFor="" >* Description:</label>
          <input type="text" name="description" autoComplete="off" placeholder="The shooter game..." onChange={onHandleChange}
            value={input.description && input.description} />

          {/* Released */}
          <label htmlFor="">Released:</label>
          <input type="date" name="released" autoComplete="off" onChange={onHandleChange} className={s.inputReleased}
            value={input.released && input.released} />

          {/* Rating */}
          <label htmlFor="">*Rating:</label>
          <input type="input" name="rating" autoComplete="off" placeholder="0-5" onChange={onHandleChange}
            value={input.rating && input.rating} />

          {/* Platforms */}
          <label htmlFor="">Platforms:</label>
          <input type="text" name="platforms" autoComplete="off" placeholder="PC" onChange={onHandleChange}
            value={input.platforms && input.platforms} />

          {/* Image */}
          <label htmlFor="">Image:</label>
          <input type="text" name="image" autoComplete="off" placeholder="URL" onChange={onHandleChange}
            value={input.image !== "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSch19yXTth6yL5J-SU6FafjJAUv1C1ptwziIyqk_3Skw&s.png" ? input.image : ""} />

          {/* Create */}
          <button type="submit" > Create </button>
        </form>
        <div className={s.divContarner}>
          <div>
            <h2>Select genres for your video game</h2>
          </div>
          {/* Genres */}
          <div className={s.containgerGenres}>
            {
              images?.map(e => {
                const name = e.split("/")[3].split(".")[0]
                return (
                  <div className={input?.genres.includes(name) ? 'containerImagesActive' : 'containerImages'}>
                    <img className={s.imgGenre} src={e} id={name} name='genres' onClick={onHandleChange} />
                    {name.split(` `).length > 1 ? <><h3>{name.split(" ")[0]}</h3><h3>{name.split(" ")[1]}</h3></> : <h3>{name}</h3>}
                  </div>)
              })
            }
          </div>
        </div>
        <div className={s.card}>
          <img className={s.img} src={input.image} alt={`${input.name}-imagen`} />
          <h3 className={s.name}>{input.name}</h3>
          <div className={s.labels}>{input.genres.map(e => <label key={Math.random() * 100}>{e}</label>)}
          </div>
        </div>
      </div>
    </>)
}
