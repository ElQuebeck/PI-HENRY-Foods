const { Recipe } = require("../db");
const axios = require("axios");
const { DB_APIKEY } = process.env; 


// var getAllRecipesFromApi =

// ------------------> POST-CREATE-RECIPE-HANDLER ------------------>
const createRecipe = async (title, summary, healthScore, steps, diets) =>
  await Recipe.create({ title, summary, healthScore, steps, diets });
// <------------------ POST-CREATE-RECIPE-HANDLER <------------------


  // ------------------> GET-RECIPE-HANDLER ------------------>
const getRecipeById = async (id, source) => {
  const recipeRaw = 
    source === "api"
      ? (await axios.get(`https://api.spoonacular.com/recipes/${id}/information${DB_APIKEY}&number=100`))      
      //https://jsonplaceholder.typicode.com/users/${id}
          .data
      : await [Recipe.findByPk(id)];
      //: await [Recipe.findByPk(id),{
      //   include: {
      //     model: Diet,
      //     attributes: ["name"]
      //   }
      // }];
  const recipe = cleanInfo([recipeRaw])      
  return recipe;
};
// <------------------ GET-RECIPE-HANDLER <------------------

// ------------------> GET-RECIPES-HANDLER ------------------>
// *** filtrado de datos ***
const cleanInfo = (arr) => 
  arr.map((e) => {
    return {
      id: e.id,
      title: e.title,
      diets: e.diets,
      summary: e.summary,
      healthScore: e.healthScore,
      steps: e.analyzedInstructions.map((s) => `${s.number}: ${s.step}`),
      image: e.image,
      created: false
    };
  });
// *** filtrado de datos ***

const getAllRecipes = async () => {
  const dataBaseRecipes = await Recipe.findAll();
  const apiRecipesRaw = (
    await axios.get(`https://api.spoonacular.com/recipes/complexSearch${DB_APIKEY}&addRecipeInformation=true&number=100`)
  ).data;
  const apiRecipes = cleanInfo(apiRecipesRaw.results);
  return [...dataBaseRecipes, ...apiRecipes];
};

const searchRecipeByName = async (name) => {
  const dataBaseRecipesRaw = await Recipe.findAll();
  const dataBaseRecipes = []
  dataBaseRecipesRaw.forEach(recipe => {
    recipe.title.includes(name[0].toUpperCase() + name.slice(1)) ? dataBaseRecipes.push(recipe) : null
})
  const apiRecipesRaw = (
    await axios.get(`https://api.spoonacular.com/recipes/complexSearch${DB_APIKEY}&addRecipeInformation=true&number=100`)
  ).data;
  const apiRecipes = []
  cleanInfo(apiRecipesRaw.results).forEach(recipe => {
    recipe.title.includes(name[0].toUpperCase() + name.slice(1)) ? apiRecipes.push(recipe) : null
  })

  return [...dataBaseRecipes, ...apiRecipes];
}

const getRecipeByDiet = async (diet) => {
  const dataBaseRecipesRaw = await Recipe.findAll();
  const dataBaseRecipes = []
  dataBaseRecipesRaw.forEach(recipe => {
    recipe.diets.includes(diet) ? dataBaseRecipes.push(recipe) : null
})
  const apiRecipesRaw = (
    await axios.get(`https://api.spoonacular.com/recipes/complexSearch${DB_APIKEY}&addRecipeInformation=true&number=100`)
  ).data;
  const apiRecipes = []
  cleanInfo(apiRecipesRaw.results).forEach(recipe => {
    recipe.diets.includes(diet) ? apiRecipes.push(recipe) : null
  })

  return [...dataBaseRecipes, ...apiRecipes];
}
// <------------- GET-RECIPES-HANDLER <-------------

module.exports = { createRecipe, getRecipeById, getAllRecipes, searchRecipeByName, getRecipeByDiet };
