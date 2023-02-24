import React, { useEffect } from "react";
//import CardDetail from "../../Components/CardDetail/CardDetail";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRecipeById } from "../../Redux/Actions";
import style from "./Detail.module.css";

export default function Detail() {
  const dispatch = useDispatch();
  let { id } = useParams();
  let counterDts = 1000;
  let counterSteps = 1;

  useEffect(() => {
    dispatch(getRecipeById(id));
  }, [dispatch, id]);

  let recipeDetail = useSelector((state) => state.recipeDetail);

  function removeTags(str) {
    if (str === null || str === "") return false;
    else str = str.toString();

    return str.replace(/(<([^>]+)>)/gi, "");
  }

  return (
    <div className={style.detail}>
      <h1 className={style.title}> {recipeDetail.title} </h1>
      <div className={style.hero_detail}>
        <div className={style.columns}>
          <img
            className={style.featured_image}
            src={recipeDetail.image}
            alt="NOT FOUND"
          ></img>
        </div>
        <div className={style.columns}>
          <h4> Nivel de salud (1-100): {recipeDetail.healthScore} </h4>
          <h4> Dietas que aplican: </h4>
          <ul>
            {recipeDetail.diets &&
              recipeDetail.diets.map((d) => <li key={counterDts++}>{d}</li>)}
          </ul>
        </div>
      </div>
      <div>
        <h4> Resumen del plato:</h4>
        <p>{recipeDetail.summary && removeTags(recipeDetail.summary)}</p>
      </div>

      
      <div>
        <h4> Preparación: </h4>
        {recipeDetail.created ? (
          <p>
            <b>Paso N° 1: </b>
            {recipeDetail.steps}
          </p>
        ) : (
          recipeDetail.steps &&
          recipeDetail.steps.map((d) => (
            <p key={counterSteps++}>
              <b>Paso N°{d.number}:</b> {d.step}
            </p>
          ))
        )}
      </div>
    </div>
  );
}
