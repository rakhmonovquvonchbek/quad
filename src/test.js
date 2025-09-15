const fs = require("fs");

// Load the recipes.json file
const recipes = JSON.parse(fs.readFileSync("data/recipes.json", "utf-8"));

// Print the first recipe
console.log("First recipe:", recipes[0].name);
console.log("Full object:", recipes[0]);
