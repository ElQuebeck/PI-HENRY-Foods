import React from "react";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";

export default function CardsContainer() {
  const recipes = useSelector((state) => state.recipes);

  return (
    <div className={style.container}>
        {recipes.map((r) => {
            return <Card 
                        id = {r.id}
                        title = {r.title}
                        diets = {r.diets}
                        image = {r.image}
                        key={r.id}
                        />
        })}
    </div>
  );
}
