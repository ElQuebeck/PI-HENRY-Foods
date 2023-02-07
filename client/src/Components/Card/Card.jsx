import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card(props) {
  return (
    <div className={style.container}>
      <h1>{props.title}</h1>
      <Link
        to={{
          pathname: `/detail/${props.id}`          
        }}
      >
        <img src={props.image} alt="Not Found" />
      </Link>
      <p>Dietas:{props.diets}</p>
    </div>
  );
}
