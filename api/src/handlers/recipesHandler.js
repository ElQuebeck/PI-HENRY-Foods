const {createRecipe, getRecipeById, getAllRecipes, searchRecipeByName} = require("../controllers/recipeController")

const getRecipesHandler = async (req, res) => {
    const { name } = req.query;
    try {
      const result = name ? await searchRecipeByName(name) : await getAllRecipes(); 
    res.status(200).json(result);
    } catch (error) {
      res.status(400).json({error: error.message})
    }
    
}

const getRecipeHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? "dbb" : "api";
    try {
      const recipe = await getRecipeById(id, source);
      res.status(200).json(recipe);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

const createRecipeHandler = async (req, res) => {
    try {
        const {title, summary,healthScore, steps} = req.body
        const newRecipe = await createRecipe(title, summary,healthScore, steps)
    res.status(200).json(newRecipe)
    } catch (error) {
        res.status(400).json({error: error.message})
    }    
}

module.exports = {
    getRecipeHandler,
    getRecipesHandler,
    createRecipeHandler
}