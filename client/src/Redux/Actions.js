import axios from "axios";
// import { recipes } from "../Auxiliar/DatosPrueba";


export const GET_RECIPES = "GET_RECIPES";

export const getRecipes = () => {
  return async (dispatch) => {
    const apiAndDbData = await axios.get(
      `http://localhost:3001/recipes`
    );    
    const recipes = apiAndDbData.data;
    dispatch({ type: GET_RECIPES, payload: recipes });
  };
};