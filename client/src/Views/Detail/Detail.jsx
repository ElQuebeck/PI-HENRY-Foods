import React from "react";
import CardDetail from "../../Components/CardDetail/CardDetail";
import axios from "axios";
import { useParams } from "react-router-dom";



export default function Detail () {  
  let {id} = useParams()  
  // console.log("params -->", id) 

  const recipe = () => {
    axios
    .get(`http://localhost:3001/recipes/${id}`)
    //.then((res) => alert(res.data))
    .then((res) => console.log(res))
    .catch((err) => alert(err));
  }
  // console.log("recipe -->", recipe) 

  return (
    <div>
      <h1> DETALLE DE LA RECETA </h1>
      <CardDetail />
    </div>
  );
}

