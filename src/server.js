// src/server.js
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Get correct file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load recipes from seed.json (one level up from src/)
const dataPath = path.join(__dirname, "../data/seed.json");

let recipes = [];
try {
  const rawData = fs.readFileSync(dataPath, "utf-8");
  recipes = JSON.parse(rawData);
  console.log(`✅ Loaded ${recipes.length} recipes from seed.json`);
} catch (err) {
  console.error("❌ Failed to load recipes:", err);
  process.exit(1);
}

// Route: get all recipes
app.get("/recipes", (req, res) => {
  console.log("📥 GET /recipes called");
  res.json(recipes);
});

// Route: get a single recipe by id
app.get("/recipes/:id", (req, res) => {
  const recipe = recipes.find(r => r.id === req.params.id);
  if (!recipe) {
    return res.status(404).json({ error: "Recipe not found" });
  }
  res.json(recipe);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API running at http://localhost:${PORT}`);
});
