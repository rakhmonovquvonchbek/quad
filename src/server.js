// src/server.js
import express from "express";
import fs from "fs";

const app = express();
const PORT = 3000;

// Load recipes from seed.json
const recipes = JSON.parse(fs.readFileSync("data/seed.json", "utf-8"));

// Route: all recipes
app.get("/recipes", (req, res) => {
  res.json(recipes);
});

// Route: single recipe by id
app.get("/recipes/:id", (req, res) => {
  const recipe = recipes.find(r => r.id === req.params.id);
  if (!recipe) {
    return res.status(404).json({ error: "Recipe not found" });
  }
  res.json(recipe);
});

app.listen(PORT, () => {
  console.log(`🚀 API running at http://localhost:${PORT}`);
});
