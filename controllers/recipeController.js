const Recipe = require('../models/Recipe');

// Create a new recipe
exports.createRecipe = async (req, res) => {
   try {
       const recipe = new Recipe(req.body);
       const savedRecipe = await recipe.save();
       res.status(201).json(savedRecipe);
   } catch (error) {
       res.status(400).json({ message: error.message });
   }
};

// Retrieve all recipes
exports.getAllRecipes = async (req, res) => {
   try {
       const recipes = await Recipe.find();
       res.json(recipes);
   } catch (error) {
       res.status(500).json({ message: error.message });
   }
};

// Retrieve a recipe by ID
exports.getRecipeById = async (req, res) => {
   try {
       const recipe = await Recipe.findById(req.params.id);
       if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
       res.json(recipe);
   } catch (error) {
       res.status(500).json({ message: error.message });
   }
};

// Update a recipe by ID
exports.updateRecipe = async (req, res) => {
   try {
       const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
       if (!updatedRecipe) return res.status(404).json({ message: 'Recipe not found' });
       res.json(updatedRecipe);
   } catch (error) {
       res.status(400).json({ message: error.message });
   }
};

// Delete a recipe by ID
exports.deleteRecipe = async (req, res) => {
   try {
       const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
       if (!deletedRecipe) return res.status(404).json({ message: 'Recipe not found' });
       res.json({ message: 'Recipe deleted' });
   } catch (error) {
       res.status(500).json({ message: error.message });
   }
};
