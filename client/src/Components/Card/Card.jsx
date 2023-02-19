import React from "react";
import style from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card(props) {
  let counterDts = 1000
 
  return (
    <div className={style.container}>
      <Link
        to={{
          pathname: `/detail/${props.id}`
        }}
      >
        <img className={style.plato_img} src={props.image} alt="Not Found" />
      </Link>
      <div className={style.description}>
        <Link className={style.title}
          to={{
            pathname: `/detail/${props.id}`
          }}
        >
          <h1>{props.title}</h1>
        </Link>
        <ul>
            {props.diets && props.diets.map((d) => <li key={counterDts++}>{d}</li>)}
          </ul>
      </div>
    </div>
  );
}
