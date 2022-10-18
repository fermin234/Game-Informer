import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideoGame } from "../../redux/actions";
import NavBar from "../navBar/navBar";

export default function Form() {

  const dispatch = useDispatch()
  const create = useSelector(s => s.createVideoGame)

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    platforms: [],
    genres: [],
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSch19yXTth6yL5J-SU6FafjJAUv1C1ptwziIyqk_3Skw&s",
  })

  function handleSubmit(e) {
    e.preventDefault()
    // setInput({
    //   ...input,
    //   platforms: input.platforms.split(" "),
    //   genres: input.genres.split(" ")
    // })
    console.log('el input: ', input);
    dispatch(createVideoGame(input), console.log(create))

    //reseteo el estado local
    setInput({
      name: "",
      description: "",
      released: "",
      rating: "",
      platforms: [],
      genres: [],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSch19yXTth6yL5J-SU6FafjJAUv1C1ptwziIyqk_3Skw&s",
    })
  }

  function onHandleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  function onHandleChangeArrays(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div>
      <NavBar />
      <form onSubmit={handleSubmit} method="post">
        name
        <input type="text" name="name" onChange={onHandleChange} />
        description
        <input type="text" name="description" onChange={onHandleChange} />
        released
        <input type="text" name="released" onChange={onHandleChange} />
        rating
        <input type="text" name="rating" onChange={onHandleChange} />
        platforms
        <input type="text" name="platforms" onChange={onHandleChangeArrays} />
        genres
        <input type="text" name="genres" onChange={onHandleChangeArrays} />
        image
        <input type="text" name="image" onChange={onHandleChange} />
        <button type="submit"> Create </button>
      </form>
      <h1>Create</h1>
    </div>
  )
}