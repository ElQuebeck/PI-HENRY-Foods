const { Recipe } = require("../db");
const axios = require("axios");
const { DB_APIKEY } = process.env;
const data = require("../Auxiliar/datos"); // <--------- DESCOMENTAR

// **_**_**_**_**_**_PASAR DE API A DATA LOCAL**_**_**_**_**_**_** //
// Descomentar todos y comentar todos - NO olvidar ver ACTIONS
// Trabajamos con ./Auxiliar/datos
// **_**_**_**_**_**_PASAR DE API A DATA LOCAL**_**_**_**_**_**_** //


// ------------------> POST-CREATE-RECIPE-HANDLER ------------------>
const createRecipe = async (title, summary, healthScore, steps, diets, image) => { 
   await Recipe.create({
    title,
    summary,
    healthScore,
    steps,
    diets,
    image,
  });
}// <------------------ POST-CREATE-RECIPE-HANDLER <------------------


// ------------------> GET-RECIPE-HANDLER ------------------>
const getRecipeById = async (id, source) => {
  let recipeRaw =
    source === "api"
    ? data // <--------------------------------------- DESCOMENTAR (VER ACTIONS Y RECIPEDIETS)
      // ? (
      //     await axios.get(
      //       `https://api.spoonacular.com/recipes/${id}/information${DB_APIKEY}` // COMENTAR BLOQUE
      //     )
      //   ).data
      : await Recipe.findByPk(id);
 
  if (source === "api") {
    let filtrado = recipeRaw.filter(r => r.id == id)// <---------------DESCOMENTAR  (VER ACTIONS)
    var recipe = cleanInfo(filtrado); // <---------- DESCOMENTAR (VER ACTIONS)
    // var recipe = cleanInfo([recipeRaw]); // <---------- COMENTAR   
  }
  if (source === "api") {
    return recipe[0];
  } else {    
    return recipeRaw;
  }
};
// <------------------ GET-RECIPE-HANDLER <------------------



// ------------------> GET-RECIPES-HANDLER ------------------>
// ***** filtrado de datos ***** //
const cleanInfo = (arr) =>
  arr.map((e) => {
    return {
      id: e.id,
      title: e.title,
      diets: e.diets.length ? e.diets : [],
      summary: e.summary,
      healthScore: e.healthScore,
      steps: e.analyzedInstructions.length
        ? e.analyzedInstructions[0].steps
        : [],
      image: e.image,
      created: false,
    };
  });
// ***** filtrado de datos ***** //

const getAllRecipes = async () => {
  const dataBaseRecipes = await Recipe.findAll();
  const apiRecipesRaw = data; // <-------------- DESCOMENTAR (VER ACTIONS) 
  // const apiRecipesRaw = (
  //   await axios.get(               // COMENTAR BLOQUE
  //     `https://api.spoonacular.com/recipes/complexSearch${DB_APIKEY}&addRecipeInformation=true&number=100`
  //   )
  // ).data.results; 
  const apiRecipes = cleanInfo(apiRecipesRaw);
  
  return [...dataBaseRecipes, ...apiRecipes];
};

const searchRecipeByName = async (name) => {
  const allRecipes = await getAllRecipes();
  let filtrando = allRecipes.filter((r) => r.title.includes(name)); 
  if (filtrando.length) {
    return filtrando;
  } else {
    return "No hay coincidencias";
  }
};

const searchRecipeByDiet = async (diet) => {
  const allRecipes = await getAllRecipes();
  let filtrado = [];

  for (let i = 0; i < allRecipes.length; i++) {
    if (allRecipes[i].diets.includes(diet)) filtrado.push(allRecipes[i]);    
  }

  return filtrado;
};
// <------------- GET-RECIPES-HANDLER <-------------

module.exports = {
  createRecipe,
  getRecipeById,
  getAllRecipes,
  searchRecipeByName,
  searchRecipeByDiet,
};
