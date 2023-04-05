import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const GET_RECIPE_BY_ID = "GET_RECIPE_BY_ID";
export const GET_DIETS = "GET_DIETS";
export const GET_RECIPES_BY_DIET = "GET_RECIPES_BY_DIET";
export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME";
export const GET_COMB_NAME_AND_DIET = "GET_COMB_NAME_AND_DIET";
export const ORDER_RECIPES = "ORDER_RECIPES"



export const getRecipes = () => { 
  return async (dispatch) => {
    const apiAndDbData = await axios.get(`/recipes`);
    const recipes = apiAndDbData.data;
    dispatch({ type: GET_RECIPES, payload: recipes });
  };
}

export const getRecipeById = (id) => {
  return async (dispatch) => {
    const recipeById = await axios.get(`/recipes/${id}`);
    const recipe = recipeById.data[0]; // <--------------- COMENTAR (VER RECIPE CONTROLLERS)
    // const recipe = recipeById.data; // <--------------- DESCOMENTAR   
    dispatch({ type: GET_RECIPE_BY_ID, payload: recipe });    
  };
};

export const getRecipeByName = (name) => {
  return async (dispatch) => {
    const recipesByName = await axios.get(`/recipes?name=${name}`);    
    dispatch({ type: GET_RECIPES_BY_NAME, payload: recipesByName.data })
  };
}

export const orderRecipes = (orderType) =>{  
  return {type: ORDER_RECIPES, payload: orderType} 
 }

export const getRecipesByDiet = (diet) => {
  return async (dispatch) => {
    const recipesByDiet = await axios.get(
      `/recipes?diet=${diet}`
    );    
    dispatch({ type: GET_RECIPES_BY_DIET, payload: recipesByDiet.data });
  };
};

export const searchByNameAndFilterByDiet = (diet, name) => {
  return async (dispatch) => {    
    const recipesByName = await axios.get(`/recipes?name=${name}`);    
    const filtrando = [];
    for (let i = 0; i < recipesByName.data.length; i++) {
      if (recipesByName.data[i].diets.includes(diet)) filtrando.push(recipesByName.data[i]);
    }    
    dispatch({ type: GET_COMB_NAME_AND_DIET, payload: filtrando });
  };
};

export const getDiets = () => {
  return async (dispatch) => {
    const dietsList = await axios.get(`/diets`);
    dispatch({ type: GET_DIETS, payload: dietsList.data });
  };
};
