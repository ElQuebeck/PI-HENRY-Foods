const { Diet } = require("../db");
const axios = require("axios");
const { DB_APIKEY } = process.env;
const data = require("../Auxiliar/datos")

// ------------------> AUTOPOST-CREATE-DIET-HANDLER ------------------>
const createDietsListInDb = async () => {
  try {
    const diets = await getAllDiet();
    const create = diets.map((d) => Diet.findOrCreate({ where: { id:d.id, name: d.name } }));
    Promise.all(create).then(console.log("Dietas cargadas en la Base de Datos"))
  } catch (error) {
    console.log("Error: no se pudieron cargar las dietas en la Base de Datos")
  }  
};
// <------------------ AUTOPOST-CREATE-DIET-HANDLER <------------------

// ------------------> GET-DIET-HANDLER ------------------>
const getAllDiet = async () => {
  const apiRecipesRaw = data // <----------- DESCOMENTAR (VER ACTIONS Y REPICECONTROLLERS)
  // const apiRecipesRaw = ( // <-------------- COMENTAR BLOQUE
  //   await axios.get(
  //     `https://api.spoonacular.com/recipes/complexSearch${DB_APIKEY}&addRecipeInformation=true&number=100`
  //   )
  // ).data.results;
  const repeatsDiets = [];
  apiRecipesRaw.map((r) =>
    r.diets.forEach((e) => repeatsDiets.push(e))
  ); 
      let i = 1
  const arrayDeDiets = [...new Set(repeatsDiets)];
  const result = arrayDeDiets.map((e) => {return {id:i++, name:e}})
  return result
};
// <------------------ GET-DIET-HANDLER <------------------

module.exports = { getAllDiet, createDietsListInDb };
