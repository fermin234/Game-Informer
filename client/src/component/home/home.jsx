import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import s from './home.module.css'
import NavBar from "../navBar/navBar";
import Card from "../card/card.jsx";
import Pagination from "../pagination/pagination.jsx";
import { allVideoGames } from "../../redux/actions";
import Filtered from "../filtered/filtered";

export default function Home({ match }) {
  const dispatch = useDispatch()
  const [oreden, setOrden] = useState("")
  const listVideoGames = useSelector(s => s.filtred)
  // const a = useSelector(s => s.videoGames)
  const [currentPage, setCurrentPage] = useState(1)
  const videoGamePerPage = 15
  const indexOfLastVideoGame = currentPage * videoGamePerPage
  const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamePerPage
  const currentVideoGame = Array.isArray(listVideoGames)
    ? listVideoGames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
    : []


  function paginado(pageNumber) {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(allVideoGames())
  }, [dispatch])

  return (
    <>
      <NavBar match={match} setCurrentPage={setCurrentPage} />
      <Filtered setCurrentPage={setCurrentPage} setOrden={setOrden} />
      <div className={s.container}>
        {listVideoGames.length
          ? <div className={s.div}>
            {currentVideoGame?.map(e => <Card key={e.id} name={e.name} genres={e.genres} image={e.background_image} id={e.id} />)}
          </div>
          :
          <div className={s.loader}></div>}
        <Pagination videoGamePerPage={videoGamePerPage} listVideoGames={listVideoGames.length} paginado={paginado} />
      </div>
    </>
  )
}