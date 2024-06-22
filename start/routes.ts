/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import RecipesController from '#controllers/recipes_controller'

router.on('/').render('pages/home')
router.on('/search').render('pages/recipes')
router.on('/popular').render('pages/popular')
// router.on('/blog').render('pages/blog')
router.get('/blog', RecipesController.fetchRandomRecipes)
router.get('/recipes', RecipesController.fetchRecipes)
router.post('/recipes', RecipesController.store)
router.get('/recipes/:id', RecipesController.show)
router.put('/recipes/:id', RecipesController.update)
router.delete('/recipes/:id', RecipesController.destroy)