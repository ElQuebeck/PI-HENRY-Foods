const { getAllDiet, createDietsListInDb } = require("../controllers/dietController");

const getDietHandler = async (req, res) => {
   try {
    await createDietsListInDb()
    const diets = await getAllDiet();
    res.status(200).json(diets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getDietHandler };
