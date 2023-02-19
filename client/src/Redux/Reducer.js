import {
  GET_RECIPES,
  GET_RECIPE_BY_ID,
  GET_DIETS,
  GET_RECIPES_BY_DIET,
  GET_RECIPES_BY_NAME,
  GET_COMB_NAME_AND_DIET,
  ORDER_RECIPES
} from "./Actions";
// import {recipes} from "../Auxiliar/DatosPrueba"

export const initialState = {
  recipes: [],
  recipeDetail: [],
  dietsList: [],
  caca: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RECIPES_BY_NAME:
      return { ...state, recipes: action.payload };
    case GET_RECIPES:
      return { ...state, recipes: action.payload };
    case GET_RECIPES_BY_DIET:
      return { ...state, recipes: action.payload };
    case GET_COMB_NAME_AND_DIET:
      return { ...state, recipes: action.payload };
    case GET_RECIPE_BY_ID:
      return { ...state, recipeDetail: action.payload };
    case GET_DIETS:
      return { ...state, dietsList: action.payload };
      case ORDER_RECIPES:
        if (action.payload === "a-z") {
          const orderAZ = state.recipes.sort(function (a, b) {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
              return -1;
            }
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
              return 1;
            }
            return 0;
          });
          return {...state, recipes: orderAZ}
        }
        if (action.payload === "z-a") {
          const orderZA = state.recipes.sort(function (a, b) {
            if (a.title.toLowerCase() > b.title.toLowerCase()) {
              return -1;
            }
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
              return 1;
            }
            return 0;
          });
          return {...state, recipes: orderZA}
        }
        if (action.payload === "menor-mayor") {
          const orderMenMay = state.recipes.sort(function (a, b) {
           return a.healthScore-b.healthScore;
          });
          return {...state, recipes: orderMenMay}
        }
        if (action.payload === "mayor-menor") {
          const orderMayMen = state.recipes.sort(function (a, b) {
           return a.healthScore-b.healthScore;
          });
          return {...state, recipes: orderMayMen}
        }
         
    default:
      return { ...state };
  }
};

export default rootReducer;
