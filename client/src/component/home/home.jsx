import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import s from './home.module.css'
import NavBar from "../navBar/navBar";
import Card from "../card/card.jsx";
import Pagination from "../pagination/pagination.jsx";
import { allVideoGames, loader } from "../../redux/actions";
import Filtered from "../filtered/filtered";

export default function Home({ match }) {
  const dispatch = useDispatch()

  const [initial, setInitial] = useState(1)
  const [final, setFinal] = useState(8)

  const [update, setUpdate] = useState(true)
  const listVideoGames = useSelector(s => s.filtred)
  const stateVideoGames = useSelector(s => s.videoGames)
  const loaderStatus = useSelector(s => s.loader)
  const [currentPage, setCurrentPage] = useState(1)
  const videoGamePerPage = 15
  const indexOfLastVideoGame = currentPage * videoGamePerPage
  const indexOfFirstVideoGame = indexOfLastVideoGame - videoGamePerPage
  let currentVideoGame = Array.isArray(listVideoGames)
    ? listVideoGames?.slice(indexOfFirstVideoGame, indexOfLastVideoGame)
    : []

  if (!localStorage.getItem("favorites")) localStorage.setItem("favorites", "[]")

  function paginado(pageNumber) {
    setCurrentPage(pageNumber)
  }


  useEffect(() => {
    if (!stateVideoGames.length) {
      dispatch(allVideoGames())
      dispatch(loader(true))
    }
  }, [dispatch, listVideoGames])

  return (
    <div className={s.containerAll}>
      <NavBar match={match} setCurrentPage={setCurrentPage} />
      {
        loaderStatus
          ? <div className={s.loader}></div>
          : listVideoGames.length ?
            <>
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
                  {currentVideoGame?.map(e => <Card key={e.id} name={e.name} genres={e.genres} image={e.background_image} id={e.id} created={e.created} />)}
                </div>
              </div>
              <div className={s.containerPagination}>
                <div className={s.div}>
                </div>
                <div className={s.div2}>
                  <div>
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
                </div>
              </div>
            </>
            : <div className={s.container}>
              <div className={s.containerFilter}>
                <Filtered setCurrentPage={setCurrentPage}
                  update={update}
                  setUpdate={setUpdate}
                  setInitial={setInitial}
                  setFinal={setFinal}
                />
              </div>
              <h1 className={s.noGames}>
                No hay juegos
              </h1>
            </div>
      }
    </div>
  )
} 