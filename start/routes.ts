import router from '@adonisjs/core/services/router'
import RecipesController from '#controllers/recipes_controller'

/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/


// Render the home page
router.on('/').render('pages/home')

// Render the recipes page
router.on('/search').render('pages/recipes')

// Render the popular page
router.on('/popular').render('pages/popular')

// Fetch random recipes for the blog page
router.get('/blog', RecipesController.fetchRandomRecipes)

// Fetch all recipes
router.get('/recipes', RecipesController.fetchRecipes)

// Store a new recipe
router.post('/recipes', RecipesController.store)

// Show a specific recipe
router.get('/recipes/:id', RecipesController.show)

// Update a specific recipe
router.put('/recipes/:id', RecipesController.update)

// Delete a specific recipe
router.delete('/recipes/:id', RecipesController.destroy)