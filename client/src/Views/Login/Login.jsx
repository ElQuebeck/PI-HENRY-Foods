import React from "react";
import { Link } from "react-router-dom";
import style from "./Login.module.css";

export default function Login() {
  return (
    <div className={style.container_bg}>
      <img className={style.ratatouille_img} src={require("./../../Images/ratatouille.webp").default} alt="Ratatouille" />
      <div>
        <h1>Bienvenid@ al Recetario de Tuermana</h1>
        <Link to="/home">
          <button class={style.cta}>
            <span>Empezar</span>
            <svg viewBox="0 0 13 10" height="10px" width="15px">
              <path d="M1,5 L11,5"></path>
              <polyline points="8 1 12 5 8 9"></polyline>
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}