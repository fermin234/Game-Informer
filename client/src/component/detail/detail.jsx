import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { VideoGameById } from "../../redux/actions";

export default function Detail({ match }) {
  const dispatch = useDispatch()

  const id = match.params.id
  const videoGame = useSelector(state => state.detail)

  useEffect(() => {
    dispatch(VideoGameById(id))
  }, [dispatch, id])


  return (
    <div>
      <h1>Detail</h1>
      name:<h1>{videoGame.name}</h1>
      description:<h1>{videoGame.description}</h1>
      released:<h1>{videoGame.released}</h1>
      rating:<h1>{videoGame.rating}</h1>
      platforms:<h1>{videoGame.platforms}</h1>
      background_image:<h1>{videoGame.background_image}</h1>
    </div>)
}