const {Router} = require("express");
const {createDietHandler} = require("../handlers/dietsHandler")


const dietsRouter = Router();

// LA PRIMERA VEZ QUE HACE EL GET DEBE TRAER LOS TIPOS DE DIETA DE https://spoonacular.com/food-api/docs#Diets
// A PARTIR DE LA SEGUNDA VEZ -->

dietsRouter.post("/", createDietHandler)

module.exports = dietsRouter;