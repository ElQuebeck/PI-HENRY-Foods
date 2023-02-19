const {Router} = require("express");
const {getDietHandler} = require("../handlers/dietsHandler")
// const {createDietsListInDb} = require("../controllers/dietController")


const dietsRouter = Router();
//createDietsListInDb()
// LA PRIMERA VEZ QUE HACE EL GET DEBE TRAER LOS TIPOS DE DIETA DE https://spoonacular.com/food-api/docs#Diets
// A PARTIR DE LA SEGUNDA VEZ -->

dietsRouter.get("/", getDietHandler)


module.exports = dietsRouter;