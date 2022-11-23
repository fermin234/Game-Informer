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

  const [initial, setInitial] = useState(1)
  const [final, setFinal] = useState(8)


  const [oreden, setOrden] = useState("")
  const listVideoGames = useSelector(s => s.filtred)
  const stateVideoGames = useSelector(s => s.videoGames)
  const loader = useSelector(s => s.loader)
  const [currentPage, setCurrentPage] = useState(1)
  const videoGamePerPage = 15
  const indexOfLastVideoGame = currentPage * videoGamePerPage
  const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamePerPage
  let currentVideoGame = Array.isArray(listVideoGames)
    ? listVideoGames.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
    : []


  function paginado(pageNumber) {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    if (!stateVideoGames.length) {
      dispatch(allVideoGames())
    }
  }, [dispatch, listVideoGames])

  //localStorage
  if (!localStorage.getItem("favorites")) localStorage.setItem("favorites", "[]")

  return (
    <>

      <NavBar match={match} setCurrentPage={setCurrentPage} />
      <Filtered setCurrentPage={setCurrentPage}
        setOrden={setOrden}
        setInitial={setInitial}
        setFinal={setFinal}
      />

      <div className={s.container}>
        {!loader
          ? <div className={s.loader}></div>
          : listVideoGames.length ?
            <div className={s.div}>
              {currentVideoGame?.map(e => <Card key={e.id} name={e.name} genres={e.genres} image={e.background_image} id={e.id} />)}
            </div>
            :
            <h1 className={s.noGames}>{
              alert("Usted no creo ningun juego, por favor cree uno para poder visualizarlo.", window.location = 'http://localhost:3000/create')
            }
              No hay juegos
            </h1>

        }

        <Pagination videoGamePerPage={videoGamePerPage}
          listVideoGames={listVideoGames.length}
          paginado={paginado}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          initial={initial}
          setInitial={setInitial}
          final={final}
          setFinal={setFinal}
        />

      </div>
    </>
  )
} 