import React from "react";
import style from "./Pagination.module.css"

export default function Pagination({
  recipesPerPage,
  currentPage,
  setCurrentPage,
  totalRecipes,
}) {
  const pageNumbers = [];
  const recipesShow = Math.ceil(totalRecipes / recipesPerPage);

  for (let i = 1; i <= recipesShow; i++) {
    pageNumbers.push(i);
  }

  const onPreviusPage = () => {
    setCurrentPage(currentPage - 1)
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  const onNextPage = () => {
    setCurrentPage(currentPage + 1)
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  const onSpecificPage = (n) => {
    setCurrentPage(n)
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }
// className={style.btnPag}
  return (
    <div className={style.buttonCont}>
    <nav className={style.btnPag}>
      <button className={style.button} disabled={currentPage === 1 ? true : false}
        onClick={onPreviusPage}
      >
        «««{" "}
      </button>

      {pageNumbers &&
        pageNumbers.map((numPage) => (
          <button className={numPage === currentPage ? style.buttonIsCurrent : style.button} key={numPage} onClick={() => onSpecificPage(numPage)}>
            {currentPage === numPage ? <b>{numPage}</b> : numPage}
          </button>
        ))}
      <button className={style.button} disabled={currentPage === pageNumbers.length ? true : false}
        onClick={onNextPage}
      >
        »»»{" "}
      </button>
    </nav>
    </div>
  );
}
