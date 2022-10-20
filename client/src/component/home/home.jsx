import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import s from './home.module.css'
import NavBar from "../navBar/navBar";
import Card from "../card/card.jsx";
import Pagination from "../pagination/pagination.jsx";
import { allVideoGames } from "../../redux/actions";
import Filtered from "../filtered/filtered";

export default function Home() {
  const dispatch = useDispatch()
  const listVideoGames = useSelector(s => s.filtred)
  const [currentPage, setCurrentPage] = useState(1)
  const [videoGamePerPage, setVideoGamePerPage] = useState(15)
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
  }, [dispatch], listVideoGames)

  return (
    <>
      <NavBar />
      <Filtered />
      <div className={s.div}>
        {currentVideoGame?.map(e => <Card key={e.id} name={e.name} genres={e.genres} image={e.background_image} id={e.id} />)}
      </div>
      <Pagination videoGamePerPage={videoGamePerPage} listVideoGames={listVideoGames.length} paginado={paginado} />
    </>
  )
}