import {
  GET_RECIPES,
  GET_RECIPE_BY_ID,
  GET_DIETS,
  GET_RECIPES_BY_DIET,
  GET_RECIPES_BY_NAME,
  GET_COMB_NAME_AND_DIET,
  ORDER_RECIPES,
} from "./Actions";
// import {recipes} from "../Auxiliar/DatosPrueba"

export const initialState = {
  recipes: [],
  recipeDetail: [],
  dietsList: [],
  activador: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES_BY_NAME:
      return { ...state, recipes: action.payload };
    case GET_RECIPES:
      return { ...state, recipeDetail: [], recipes: action.payload };
    case GET_RECIPES_BY_DIET:
      return { ...state, recipes: action.payload };
    case GET_COMB_NAME_AND_DIET:
      return { ...state, recipes: action.payload };
    case GET_RECIPE_BY_ID:
      return { ...state, recipeDetail: action.payload };
    case GET_DIETS:
      return { ...state, dietsList: action.payload };
    case ORDER_RECIPES:   
      if (action.payload === "Alfabeticamente de A-z") {
        return {
          ...state,
          recipes: state.recipes.sort(function (a, b) {
            a = a.title.toLowerCase();
            b = b.title.toLowerCase();
            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            }
            return 0;
          }),          
        };
      }
      if (action.payload === "Alfabeticamente de Z-a") {
        return {
          ...state,
          recipes: state.recipes.sort(function (a, b) {
            a = a.title.toLowerCase();
            b = b.title.toLowerCase();
            if (b < a) {
              return -1;
            }
            if (b > a) {
              return 1;
            }
            return 0;
          }),          
        };
      }
      if (action.payload === "Salud de Menor a Mayor") {
        return {
          ...state,
          recipes: state.recipes.sort(function (a, b) {
            a = a.healthScore;
            b = b.healthScore;
            if (a < b) {
              return -1;
            }
            if (a > b) {
              return 1;
            }
            return 0;
          }),          
        };
      }
      if (action.payload === "Salud de Mayor a Menor") {
        return {
          ...state,
          recipes: state.recipes.sort(function (a, b) {
            a = a.healthScore;
            b = b.healthScore;
            if (b < a) {
              return -1;
            }
            if (b > a) {
              return 1;
            }
            return 0;
          }),          
        };
      }
      break;
    default:
      return { ...state };
  }
};

export default rootReducer;
