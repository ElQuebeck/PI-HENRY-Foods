const {
  createRecipe,
  getRecipeById,
  getAllRecipes,
  searchRecipeByName,
  searchRecipeByDiet,
} = require("../controllers/recipeController");
const { Recipe } = require("../db");

// GET ---------> recipes/
const getRecipesHandler = async (req, res) => {
  const { name } = req.query;
  const { diet } = req.query;
  try {
    const result = name
      ? await searchRecipeByName(name)
      : diet
      ? await searchRecipeByDiet(diet)
      : await getAllRecipes();
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// GET --------> recipes/:id
const getRecipeHandler = async (req, res) => {
  const { id } = req.params;
  const source = isNaN(id) ? "dbb" : "api";
  try {
    const recipe = await getRecipeById(id, source);
    if (source === "api") res.status(200).json(recipe);
    else res.status(200).json(recipe)
  } catch (error) {
    res.status(405).json({ error: error.message });
  }
};

// POST----------> recipes/
const createRecipeHandler = async (req, res) => {
  try {
    const { title, summary, healthScore, steps, diets, image } = req.body;
    await createRecipe(
      title,
      summary,
      healthScore,
      steps,
      diets,
      image
    );

    // await Recipe.create({
    //   title,
    //   summary,
    //   healthScore,
    //   steps,
    //   diets,
    //   image,
    // });
    res.status(200).send(`La receta ${title} fue creada exitosamente`);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

module.exports = {
  getRecipeHandler,
  getRecipesHandler,
  createRecipeHandler,
};
