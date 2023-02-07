const recipes = require("./info")

export const cleanInfo = (recipes) => 
recipes.map((e) => {
    return {
      id: e.id,
      title: e.title,
      diets: e.diets,
      summary: e.summary,
      healthScore: e.healthScore,
      steps: e.analyzedInstructions.map((s) => `${s.number}: ${s.step}`),
      image: e.image,
      created: false
    };
  });