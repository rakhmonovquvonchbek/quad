// src/server.js
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Handle file paths correctly
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load recipes from seed.json (go up one level from src/)
const dataPath = path.join(__dirname, "../data/seed.json");
const recipes = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

// Route: all recipes
app.get("/recipes", (req, res) => {
  console.log("📥 GET /recipes called");
  console.log("recipes length:", recipes.length);
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
