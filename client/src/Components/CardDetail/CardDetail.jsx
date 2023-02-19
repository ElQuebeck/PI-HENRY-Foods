import React from "react";
import style from "./CardDetail.module.css";


export default function CardDetail(props) {
  const steps = props.steps;
  let count = 1000000;
  return (
    <div className={style.container}>
      <h1>{props.title}</h1>
      <img src={props.image} alt="Not Found" />
      <p>Dietas:{props.diets}</p>
      <p>Resumen del plato:{props.summary}</p>
      <p>Puntos de salud:{props.healthScore}</p>
      
      <p>Preparación del plato:</p>
      {steps.map(s => (<span key={count++}> Paso {s.number}: {s.step} </span>))};
      
    </div>
  );
}
