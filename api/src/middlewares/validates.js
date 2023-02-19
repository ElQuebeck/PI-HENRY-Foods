const validateRecipe = (req, res, next) => {
  const { title, summary, healthScore, steps, diets } = req.body;
  if (!title) return res.status(410).json({ Error: "Missing title" });
  if (!summary) return res.status(411).json({ Error: "Missing summary" });
  if (!healthScore) return res.status(412).json({ Error: "Missing healthScore" });
  if (!steps) return res.status(413).json({ Error: "Missing steps" });
  if (!diets) return res.status(414).json({ Error: "Missing diets" });
  next();
};

module.exports = {
    validateRecipe
}
