const {createDiet} = require("../controllers/dietController")

const createDietHandler = async (req, res) => {
    try {
        const {id, name} = req.body
        const newDiet = await createDiet(id, name)
    res.status(200).send(newDiet)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {createDietHandler};