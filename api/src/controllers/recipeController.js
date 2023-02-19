const { Recipe } = require("../db");
const axios = require("axios");
const { DB_APIKEY } = process.env;
const data = require("../Auxiliar/datos");


// ------------------> POST-CREATE-RECIPE-HANDLER ------------------>
const createRecipe = async (title, summary, healthScore, steps, diets, image) =>
  await Recipe.create({
    title,
    summary,
    healthScore,
    steps,
    diets,
    image,
  });


// <------------------ POST-CREATE-RECIPE-HANDLER <------------------

// ------------------> GET-RECIPE-HANDLER ------------------>
const getRecipeById = async (id, source) => {
  let recipeRaw =
    source === "api"
    ? data // <---------------------------------------COMENTAR ESTOOOOOOOO (VER ACTIONS)
      // ? (
      //     await axios.get(
      //       `https://api.spoonacular.com/recipes/${id}/information${DB_APIKEY}`
      //     )
      //   ).data
      : await Recipe.findByPk(id);
 
  if (source === "api") {
    let filtrado = recipeRaw.filter(r => r.id == id) // <---------------COMENTAR ESTOOOOOOOO (VER ACTIONS)
    // console.log("LALALAALLALALAL", lalala);
    // console.log("IDDDDDDDDDDDD", id);
    var recipe = cleanInfo(filtrado); // <---------- MODIFICAR cleanInfo([recipeRaw]) (VER ACTIONS)
    //console.log("RECIPEEEEE", recipe);
  }
  if (source === "api") {
    return recipe[0];
  } else {
    // console.log("RECETA FILTRADA DE LA DB POR ID", recipeRaw.dataValues);
    return recipeRaw;
  }
};
// <------------------ GET-RECIPE-HANDLER <------------------

// ------------------> GET-RECIPES-HANDLER ------------------>
// *** filtrado de datos ***
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

// const cleanSteps = (arr) =>
// arr[0].steps.map((e) => {
//   return {
//     number: e.number,
//     step: e.step
//   }
// })
//   analyzed[0].steps                      map(x => x.steps.)
// analyzed = [ { steps = [ { number, step } ] } ]
// *** filtrado de datos ***

const getAllRecipes = async () => {
  const dataBaseRecipes = await Recipe.findAll();
  const apiRecipesRaw = data; // <-------------- COMENTAR (VER ACTIONS)
  // console.log("-------------->data", apiRecipesRaw)
  // const apiRecipesRaw = (
  //   await axios.get(
  //     `https://api.spoonacular.com/recipes/complexSearch${DB_APIKEY}&addRecipeInformation=true&number=100`
  //   )
  // ).data.results;
  // console.log("Deberia ser un array de recetas --->", apiRecipesRaw);
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

  // console.log("FILTRANDOOOOOOOOO",filtrando)

  return filtrado;
};
/*

*/
// <------------- GET-RECIPES-HANDLER <-------------

module.exports = {
  createRecipe,
  getRecipeById,
  getAllRecipes,
  searchRecipeByName,
  searchRecipeByDiet,
};
