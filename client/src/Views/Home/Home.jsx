import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getRecipes,
  getDiets,
  getRecipesByDiet,
  getRecipeByName,
  searchByNameAndFilterByDiet,
  orderRecipes,
} from "../../Redux/Actions";
import CardsContainer from "../../Components/CardsContainer/CardsContainers";
import { useSelector } from "react-redux";
import style from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, [dispatch]);

  const diets = useSelector((state) => state.dietsList);

  let count = 0;

  const [form, setForm] = useState({
    diet: "",
    title: "",
    order:""
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [property]: value });
    //setErrors(validate({ ...form, [property]: value }));
  };

  const findHandler = (e) => {
    e.preventDefault();
    if (form.title && form.diet) {
      console.log("probando ambos");
      dispatch(searchByNameAndFilterByDiet(form.diet, form.title));
    } else if (form.title) {
      console.log("probando name");
      dispatch(getRecipeByName(form.title));
    } else if (form.diet) {
      console.log("probando diet");
      dispatch(getRecipesByDiet(form.diet));
    } else alert("You must select a diet type or entry the recipe name.");
  };

  const orderHandler = (e) => {
    const value = e.target.value;

    dispatch(orderRecipes(value));
  };

  return (
    <div>
      <form className={style.form}>
        <div>
          <label>Buscar por nombre: </label>
          <input
            placeholder="Ingrese el nombre..."
            name="title"
            type="text"
            value={form.title}
            onChange={changeHandler}
          />
        </div>

        <button className={style.button} name="findname" onClick={findHandler}>
          <div className={style.svg_wrapper_1}>
            <div className={style.svg_wrapper}>
              <svg
                width="17"
                height="16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="search"
              >
                <path
                  d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                  stroke="currentColor"
                  stroke-width="1.333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
          </div>
          <span>Filtrar</span>
        </button>
        <div>
          <label>Buscar por tipo de dieta: </label>
          <select
            name="diet"
            id="dietslist"
            size="1"
            value={form.diet}
            onChange={changeHandler}
            placeholder="Seleccione la dieta..."
          >
            <option value="default">
              Tipo de dieta
            </option>
            {diets &&
              diets.map((d) => {
                return (
                  <option key={count++} value={d.name}>
                    {d.name}
                  </option>
                );
              })}
          </select>
        </div>
        <button
          className={style.button}
          id="findbydiet"
          name="finddiet"
          onClick={findHandler}
        >
          <div className={style.svg_wrapper_1}>
            <div className={style.svg_wrapper}>
              <svg
                width="17"
                height="16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="search"
              >
                <path
                  d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                  stroke="currentColor"
                  stroke-width="1.333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
          </div>
          <span>Filtrar</span>
        </button>
        <div>
        <label>Ordenar: </label>          
            <select name="order" value={form.order} onChange={changeHandler}>
              <option value="default">Seleccione la preferencia de ordenamiento</option>
              <option value="a-z">A-z</option>
              <option value="z-a">Z-a</option>
              <option value="menor-mayor">Salud de Menor a Mayor</option>
              <option value="mayor-menor">Salud de Mayor a Menor</option>              
            </select>          
        </div>
        <button
          className={style.button}
          id="order"
          name="order"
          onClick={orderHandler}
        >
          <div className={style.svg_wrapper_1}>
            <div className={style.svg_wrapper}>
              <svg
                width="17"
                height="16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="search"
              >
                <path
                  d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                  stroke="currentColor"
                  stroke-width="1.333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
          </div>
          <span>Ordenar</span>
        </button>
      </form>
      <CardsContainer />
    </div>
  );
}
