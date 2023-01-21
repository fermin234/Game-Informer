import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createVideoGame, ResetFilter, allVideoGames } from "../../redux/actions";
import NavBar from "../navBar/navBar";
import s from './form.module.css'
import Validate from "./validate.js";
import * as allImages from '../../assets'

export default function Form(props) {

  const dispatch = useDispatch()

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: null,
    platforms: [],
    genres: [],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSch19yXTth6yL5J-SU6FafjJAUv1C1ptwziIyqk_3Skw&s.png",
    created: true
  })
  const images = []


  for (const e in allImages) {
    images.push(allImages[e])
  }

  const [errors, setErrors] = useState({})

  function handleSubmit(e) {
    e.preventDefault()
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
    console.log(e.target.id);
    if (e.target.name === "platforms") {
      setInput({
        ...input,
        platforms: e.target.value.split(" "),
      })
    } else if (e.target.name === "genres") {
      if (input.genres.includes(e.target.id)) {
        const id = e.target.id
        let arr = input.genres
        const index = arr.findIndex(e => e === id)
        arr.splice(index, 1)
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
        <form className={s.form} onSubmit={handleSubmit} method="post" id="form">
          {/* Name */}
          <label htmlFor="">*Name:</label>
          <input type="text" name="name" autoComplete="off" placeholder="Counter Strike 1.6" onChange={onHandleChange} />
          <p className={errors.name ? s.danger : s.succes}>Debe contener un nombre.</p>
          <p className={errors.name ? s.danger : s.succes}>El nombre debe contener mas de una letra.</p>
          {/* Description */}
          <label htmlFor="">*Description:</label>
          <input type="text" name="description" autoComplete="off" placeholder="The shooter game..." onChange={onHandleChange} />
          <p className={errors.description ? s.danger : s.succes}>Se debe ingresar una descripcion.</p>
          {/* Released */}
          <label htmlFor="">Released:</label>
          <input type="date" name="released" autoComplete="off" onChange={onHandleChange} />
          <p className={s.danger}>{errors && errors.released}</p>
          {/* Rating */}
          <label htmlFor="">*Rating:</label>
          <input type="input" name="rating" autoComplete="off" placeholder="0-5" onChange={onHandleChange} />
          <p className={errors.rating ? s.danger : s.succes}>El rating debe estar entre 0 y 5.</p>
          {/* Platforms */}
          <label htmlFor="">Platforms:</label>
          <input type="text" name="platforms" autoComplete="off" placeholder="PC" onChange={onHandleChange} />
          <p className={s.danger}>{errors && errors.platforms}</p>
          {/* Genres */}
          {/* <label htmlFor="">Genres:</label>
          <input type="text" name="genres" autoComplete="off" placeholder="Shooter Action" onChange={onHandleChange} />
          <p className={s.danger}>{errors && errors.genres}</p> */}
          {/* Image */}
          <label htmlFor="">Image:</label>
          <input type="text" name="image" autoComplete="off" placeholder="URL" onChange={onHandleChange} />
          <p className={s.danger}>{errors && errors.image}</p>
          {/* Create */}
          <button type="submit" disabled={Object.entries(errors).length ? true : false}> Create </button>
        </form>
        <div className={s.divContarner}>
          <div>
            <h2>Select genres for your video game</h2>
          </div>
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

          {/* <img className={s.img} src={input.image} alt={`${input.name}-imagen`} />
          <h1>{input.name}</h1>
          <div className={s.containerLabels}>
            {input.genres.map(e => <label>{e}</label>)}
          </div> */}
        </div>
      </div>
    </>)
}
