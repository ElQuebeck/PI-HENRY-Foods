const {Router} = require ("express");
const {
    getRecipesHandler, 
    getRecipeHandler, 
    createRecipeHandler
} = require("../handlers/recipesHandler")
const { validateRecipe } = require("../middlewares/validates")

const recipesRouter = Router();

recipesRouter.get("/", getRecipesHandler)

recipesRouter.get("/:id", getRecipeHandler)

recipesRouter.post("/", validateRecipe, createRecipeHandler)

module.exports = recipesRouter;