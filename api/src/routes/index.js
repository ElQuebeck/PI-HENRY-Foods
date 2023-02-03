const { Router } = require("express");
const recipesRouter = require("./recipesRouter");
const dietsRouter = require("./dietsRouter");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const routes = Router();

// router.get("/", (req, res) => {
//     res.status(200).send("NIY: ESTA RUTA ES EL HOME")
// })
routes.use("/recipes", recipesRouter)
routes.use("/diets", dietsRouter)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = routes;
