const { Diet } = require("../db");
const axios = require("axios");
const { DB_APIKEY } = process.env;

// ------------------> AUTOPOST-CREATE-DIET-HANDLER ------------------>
const createDietsListInDb = async (req, res) => {
  try {
    const diets = await getAllDiet();
    const create = diets.map((d) => Diet.findOrCreate({ where: { name: d } }));
    Promise.all(create).then(console.log("Dietas cargadas en la Base de Datos"))
  } catch (error) {
    console.log("Error: no se pudieron cargar las dietas en la Base de Datos")
  }  
};
// <------------------ AUTOPOST-CREATE-DIET-HANDLER <------------------

const getAllDiet = async () => {
  const apiRecipesRaw = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch${DB_APIKEY}&addRecipeInformation=true&number=100`
    )
  ).data;
  const repeatsDiets = [];
  apiRecipesRaw.results.map((r) =>
    r.diets.forEach((e) => repeatsDiets.push(e))
  ); // devuelve [diet1, diet2. diet3...]

  return [...new Set(repeatsDiets)];
};

module.exports = { getAllDiet, createDietsListInDb };
