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

  const [update, setUpdate] = useState(true)
  const listVideoGames = useSelector(s => s.filtred)
  const stateVideoGames = useSelector(s => s.videoGames)
  const loader = useSelector(s => s.loader)
  const [currentPage, setCurrentPage] = useState(1)
  const videoGamePerPage = 15
  const indexOfLastVideoGame = currentPage * videoGamePerPage
  const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamePerPage
  let currentVideoGame = Array.isArray(listVideoGames)
    ? listVideoGames?.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
    : []
  const filterValues = useSelector(s => s.filterValues)
  // console.log(filterValues);

  function paginado(pageNumber) {
    setCurrentPage(pageNumber)
  }

  if (!localStorage.getItem("favorites")) localStorage.setItem("favorites", "[]")

  useEffect(() => {
    if (!stateVideoGames.length) {
      dispatch(allVideoGames())
    }
  }, [dispatch, listVideoGames])

  return (
    <div className={s.containerAll}>
      <NavBar match={match} setCurrentPage={setCurrentPage} />
      <div className={s.container}>
        <div className={s.containerFilter}>
          <Filtered setCurrentPage={setCurrentPage}
            update={update}
            setUpdate={setUpdate}
            setInitial={setInitial}
            setFinal={setFinal}
          />
        </div>
        <div className={s.containerCards}>
          {!loader
            ? <div className={s.loader}></div>
            : listVideoGames.length ?
              <>{currentVideoGame?.map(e => <Card key={e.id} name={e.name} genres={e.genres} image={e.background_image} id={e.id} created={e.created} />)}</>
              :
              <h1 className={s.noGames}>
                No hay juegos
              </h1>
          }
        </div>
      </div>

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
  )
} 