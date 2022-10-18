import React from "react";
import s from './pagination.module.css'

export default function Pagination({ videoGamePerPage, listVideoGames, paginado }) {

  const pageNumber = []

  for (let i = 0; i < Math.ceil(listVideoGames / videoGamePerPage); i++) {
    pageNumber.push(i + 1)
  }

  return (
    <div className={s.nav}>
      <ul>
        {pageNumber &&
          pageNumber.map(e => (
            <button key={e} onClick={() => {
              window.scrollTo({ top: 0 });
              paginado(e)
            }
            }>{e}</button>))}
      </ul>
    </div>
  )
}