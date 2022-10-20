import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideoGame } from "../../redux/actions";
import NavBar from "../navBar/navBar";
import s from './form.module.css'
import Validate from "./validate.js";
import Card from "../card/card.jsx";


export default function Form() {

  const dispatch = useDispatch()
  const create = useSelector(s => s.createVideoGame)
  const formulario = document.getElementById("form")

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: 0,
    platforms: [],
    genres: [],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSch19yXTth6yL5J-SU6FafjJAUv1C1ptwziIyqk_3Skw&s.png",
  })

  const [errors, setErrors] = useState({})

  function handleSubmit(e) {
    e.preventDefault()
    console.log('el input: ', input);
    dispatch(createVideoGame(input), console.log(create))
    //reseteo los input del form
    formulario.reset()

    //reseteo el estado local
    setInput({
      name: "",
      description: null,
      released: "",
      rating: 0,
      platforms: [],
      genres: [],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSch19yXTth6yL5J-SU6FafjJAUv1C1ptwziIyqk_3Skw&s.png",
    })
  }

  function onHandleChange(e) {
    if (e.target.name === "platforms") {
      setInput({
        ...input,
        platforms: e.target.value.split(" "),
      })
    } else if (e.target.name === "genres") {
      setInput({
        ...input,
        genres: e.target.value.split(" "),
      })
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
    console.log(input);
  }

  useEffect(() => {
    setErrors(Validate(input))
    console.log(errors);
    console.log(input);
  }, [input])


  return (
    <>
      <NavBar />
      <div className={s.container}>
        <div className={s.item}>

          <form className={s.form} onSubmit={handleSubmit} method="post" id="form">

            <label htmlFor="">*Name:</label>
            <input type="text" name="name" placeholder="Counter Strike 1.6" onChange={onHandleChange} />
            <p className={errors.name ? s.danger : s.succes}>{errors.name}</p>

            <label htmlFor="">*Description:</label>
            <input type="text" name="description" placeholder="The shooter game..." onChange={onHandleChange} />
            <p className={s.danger}>{errors && errors.description}</p>

            <label htmlFor="">Released:</label>
            <input type="date" name="released" onChange={onHandleChange} />
            <p className={s.danger}>{errors && errors.released}</p>

            <label htmlFor="">Rating:</label>
            <input type="number" name="rating" placeholder="0-5" onChange={onHandleChange} />
            <p className={s.danger}>{errors && errors.rating}</p>

            <label htmlFor="">Platforms:</label>
            <input type="text" name="platforms" placeholder="PC" onChange={onHandleChange} />
            <p className={s.danger}>{errors && errors.platforms}</p>

            <label htmlFor="">Genres:</label>
            <input type="text" name="genres" placeholder="Shooter Action" onChange={onHandleChange} />
            <p className={s.danger}>{errors && errors.genres}</p>

            <label htmlFor="">Image:</label>
            <input type="text" name="image" placeholder="URL" onChange={onHandleChange} />
            <p className={s.danger}>{errors && errors.image}</p>

            <button type="submit" > Create </button>

          </form>
        </div>

        <div className={s.item}>
          <div className={s.card}>
            <img className={s.img} src={input.image} alt={`${input.name}-imagen`} />
            <h1>{input.name}</h1>
            <h3>{input.genres.map(e => `${e} `)}</h3>
            {/* <Card key={"2"} name={input.name} genres={input.genres} image={input.background_image} /> */}
          </div>
        </div>
      </div>
    </>)
}
