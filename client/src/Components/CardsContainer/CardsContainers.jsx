import React, { useState } from "react";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";
import Pagination from "../Pagination/Pagination";

export default function CardsContainer() {
  const recipesList = useSelector((state) => state.recipes);
  const totalRecipes = recipesList.length
  // eslint-disable-next-line no-unused-vars
  const [recipes, setRecipes] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * recipesPerPage
  const firstIndex = lastIndex - recipesPerPage

  return (
    <>
      <div className={style.container}>
        {recipesList.map((r) => {
          return (
            <Card
              id={r.id}
              title={r.title}
              diets={r.diets}
              image={r.image}
              key={r.id}
            />
          );
        }).slice(firstIndex, lastIndex)}
      </div>
      <div>
        <Pagination
          recipesPerPage={recipesPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalRecipes={totalRecipes}
        />
      </div>
    </>
  );
}
