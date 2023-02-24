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
    res.status(404).json({ error: `Error al buscar la/s receta/s` });
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
    res.status(404).json({ error: `No se pudo mostrar la receta especificada` });
  }
};

// POST----------> recipes/
const createRecipeHandler = async (req, res) => {
  try {
    const { title, summary, healthScore, steps, diets, image } = req.body;
    const validate = await Recipe.findOne({ where: { title: title } })
    if (validate !== null) {
      res.status(404).send(`La receta ${title} ya existe, ingrese otro nombre!`);
    } else {await createRecipe(
      title,
      summary,
      healthScore,
      steps,
      diets,
      image
    );
    res.status(201).send(`La receta ${title} fue creada exitosamente`);
    }
  } catch (error) {
    res.status(400).json({ error: `No fue posible crear la receta.` });
  }
};

module.exports = {
  getRecipeHandler,
  getRecipesHandler,
  createRecipeHandler,
};
