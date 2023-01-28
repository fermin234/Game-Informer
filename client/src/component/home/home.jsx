import s from './Home.module.css'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { allVideoGames, getPlataforms, loader } from "../../redux/actions";
import NavBar from "../NavBar/NavBar.jsx";
import Card from "../Card/Card.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import Filtered from "../Filtered/Filtered.jsx";

export default function Home({ match }) {
  const dispatch = useDispatch()

  const [initial, setInitial] = useState(1)
  const [final, setFinal] = useState(8)
  const [update, setUpdate] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const listVideoGames = useSelector(s => s.filtred)
  const stateVideoGames = useSelector(s => s.videoGames)
  const plataforms = useSelector(s => s.plataforms)
  const loaderStatus = useSelector(s => s.loader)

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
    if (!stateVideoGames.length || loaderStatus) {
      dispatch(allVideoGames())
      dispatch(loader(true))
    }
  }, [dispatch])

  useEffect(() => {
    if (!plataforms.length)
      dispatch(getPlataforms())
  }, [dispatch])


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
                  {currentVideoGame?.map(e => <Card key={e.id} name={e.name} genres={e.genres} image={e.background_image} id={e.id} created={e.created} update={update} setUpdate={setUpdate} match={match} />)}
                  <div className={s.prueba}>
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
                No games
              </h1>
            </div>
      }
    </div>
  )
} 