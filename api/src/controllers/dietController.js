const {Diet} = require("../db")

const createDiet = async (id, name) => 
    await Diet.create({id, name})


module.exports = {createDiet}