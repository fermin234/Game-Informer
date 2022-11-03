import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import s from './pagination.module.css'
import './prueba.css'

export default function Pagination({ videoGamePerPage, listVideoGames, paginado, currentPage, initial, setInitial, final, setFinal }) {

  const pageNumber = []
  const [actual, setActual] = useState(currentPage)

  for (let i = 0; i < Math.ceil(listVideoGames / videoGamePerPage); i++) {
    pageNumber.push(i + 1)
  }

  const buttons = pageNumber.map(e => (
    <button className={actual === e ? `buttonActive` : null} id={currentPage} key={e} onClick={() => {
      window.scrollTo({ top: 0 });
      paginado(e)
    }}>
      {e}
    </button >))

  useEffect(() => {
    setActual(currentPage)
  }, [currentPage])


  return (

    <div >
      {pageNumber.length > 1 &&
        <div className={s.nav} >
          <div className={s.containerAll}>

            {/* Boton anterior */}
            <button className={s.prevNext} disabled={currentPage === 1 ? true : false} key="anterior" onClick={() => {
              window.scrollTo({ top: 0 });
              paginado(currentPage - 1)
              if (currentPage === 8) {
                setInitial(1)
                setFinal(8)
              }
              if (currentPage > 8) {
                setInitial(initial - 1)
                setFinal(final - 1)
              }
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" width="16" height="16" focusable="false"><path d="M11 1L6.39 8 11 15H8.61L4 8l4.61-7z"></path>
              </svg>
              Anterior
            </button>

            {/* Boton 1 */}
            {pageNumber.length >= 1 &&
              <button className={actual === 1 ? `buttonActive` : `button`} key="PrimerPagina" onClick={() => {
                window.scrollTo({ top: 0 });
                paginado(1)
                setFinal(8)
                setInitial(1)
              }}>
                1
              </button>
            }

            {/* ... primero */}
            {initial > 1 &&
              <button key="updateButons1" onClick={() => {
                window.scrollTo({ top: 0 });
                paginado(final - 7)
                setFinal(final - 3)
                setInitial(final - 10)
              }}>
                ...
              </button>
            }

            {/* Resto de botones */}
            {buttons.slice(initial, final)}

            {/* ... segundo */}
            {pageNumber.length > 8 && final <= pageNumber.length - 1 &&
              <button key="updateButons2" onClick={() => {
                console.log(pageNumber)
                window.scrollTo({ top: 0 });
                paginado(final + 1)
                setInitial(final)
                setFinal(final + 7)
              }}>
                ...
              </button>
            }

            {/* Boton ultima pagina */}
            {pageNumber.length > 9 && final <= pageNumber.length - 1 &&
              <button className={actual === pageNumber.length ? `buttonActive` : `button`} key="ultimaPagina" onClick={() => {
                window.scrollTo({ top: 0 });
                paginado(pageNumber.length)
                setInitial(pageNumber.length - 7)
                setFinal(pageNumber.length)
              }}>
                {pageNumber.length}
              </button>
            }

            {/* Boton siguiente */}
            <button className={s.prevNext} disabled={currentPage === pageNumber.length ? true : false} key="siguiente" onClick={() => {
              window.scrollTo({ top: 0 });
              paginado(currentPage + 1)
              if (currentPage > 7) {
                setInitial(initial + 1)
                setFinal(final + 1)
              }
            }}>
              Siguiente
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" width="16" height="16" focusable="false">
                <path d="M5 15l4.61-7L5 1h2.39L12 8l-4.61 7z"></path>
              </svg>
            </button>

          </div>
        </div>}

    </div >
  )
}

//cosas para mejorar:
