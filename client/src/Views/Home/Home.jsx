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
  const orderValue = [
    "Alfabeticamente de A-z", 
    "Alfabeticamente de Z-a", 
    "Salud de Menor a Mayor", 
    "Salud de Mayor a Menor"
  ]

  let count = 0;

  const [form, setForm] = useState({
    diet: "",
    title: "",
    order: "",
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [property]: value });
    //setErrors(validate({ ...form, [property]: value }));
  };

  const findHandler = (e) => {
    e.preventDefault();
    if (form.order !== "") {
      dispatch(orderRecipes(form.order));
      setForm({...form, order:""})
    } else if (form.title !== "" && form.diet !== "") {
      console.log("probando ambos");
      dispatch(searchByNameAndFilterByDiet(form.diet, form.title));
    } else if (form.title !== "") {
      console.log("probando name");
      dispatch(getRecipeByName(form.title));
    } else if (form.diet !== "") {
      console.log("probando diet");
      dispatch(getRecipesByDiet(form.diet));
    } else alert("No ha seleccionado ningún parámetro para buscar u ordenar");
  };

  // const orderHandler = (e) => {
  //   e.preventDefault();
  //   if (form.order !== "") {
  //     dispatch(orderRecipes(form.order));
  //   } else alert("Debe seleccionar un tipo para ordenar");
  // };

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
                  strokeWidth="1.333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
          >
            <option value="">Tipo de dieta</option>
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
                  strokeWidth="1.333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>
          </div>
          <span>Filtrar</span>
        </button>
        <div>
          <label>Ordenar: </label>
          <select
            id="orderlist"
            name="order"
            value={form.order}
            onChange={changeHandler}
          >
            {/* <select onChange={orderHandler} name="order" value={form.order}> */}
            <option value="">Seleccione la preferencia de ordenamiento</option>
            {orderValue.map((v) => {
                return (
                  <option key={count++} value={v}>
                    {v}
                  </option>
                );
              })}
          </select>
        </div>
        <button
          className={style.button}
          id="ord"
          name="ordered"
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
                  strokeWidth="1.333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
