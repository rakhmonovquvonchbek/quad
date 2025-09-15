const fs = require("fs");
const Ajv = require("ajv");

const ajv = new Ajv({ allErrors: true });

// Load schema & data
const schema = JSON.parse(fs.readFileSync("schema.json", "utf-8"));
const recipes = JSON.parse(fs.readFileSync("data/recipes.json", "utf-8"));

// Compile validator
const validate = ajv.compile(schema);

// Validate each recipe
let hasErrors = false;
recipes.forEach((recipe, i) => {
  const valid = validate(recipe);
  if (!valid) {
    hasErrors = true;
    console.error(`❌ Recipe ${i + 1} (${recipe.name || "Unnamed"}) is invalid:`);
    console.error(validate.errors);
  } else {
    console.log(`✅ Recipe ${i + 1} (${recipe.name}) is valid.`);
  }
});

if (hasErrors) {
  process.exit(1); // fail the script if any recipe is invalid
}
