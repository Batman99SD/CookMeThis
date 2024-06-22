import type { HttpContext } from '@adonisjs/core/http'
import Recipe from '../Models/Recipe.js'
import axios from 'axios'
import env from '#start/env';

export default class RecipesController {
    public static async index({ response }: HttpContext) {
      try {
        const recipes = await Recipe.all()
        return response.json(recipes)
      } catch (error) {
        console.error('Error fetching recipes:', error)
      return response.status(500).json({ error: 'Failed to fetch recipes' })
    }
  }

    public static async fetchRecipes({ request, response }: HttpContext) {
        const ingredients = request.input('ingredients')
        try {
          const apiResponse = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
            params: {
              ingredients,
              apiKey: env.get('SPOONACULAR_API_KEY')
            }
          })
          return response.json(apiResponse.data)
        } catch (error) {
          console.error('Error fetching recipes from API:', error)
          return response.status(500).json({ error: 'Failed to fetch recipes' })
        }
      }

      public static async fetchRandomRecipes({ view }: HttpContext) {
        const apiResponse = await axios.get('https://api.spoonacular.com/recipes/random', {
            params: {
                number: 3, // Fetch 3 random recipes
                apiKey: env.get('SPOONACULAR_API_KEY')
            }
        })
        console.log(apiResponse.data)
        const recipes = apiResponse.data.recipes;
        return view.render('pages/blog', { recipes });
    }

      public static async show({ request, response, view}: HttpContext) {
        const id = request.param('id');
        try {
          const apiResponse = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
            params: {
              id,
              includeNutrition: false,
              addWinePairing: false,
              addTasteData: false,
              apiKey: env.get('SPOONACULAR_API_KEY')}
          })
          // return response.json(apiResponse.data)
          const recipe = apiResponse.data;
          return view.render('pages/recipe', { recipe });
        } catch (error) {
          console.error('Error fetching recipes from API:', error)
          return response.status(500).json({ error: 'Failed to fetch recipes' })
        }
      }

    public static async store({ request, response }: HttpContext) {
      const data = request.only(['title', 'ingredients', 'instructions', 'image_url'])
      const recipe = await Recipe.create(data)
      return response.created(recipe)
    }

  
    public static async update({ params, request, response }: HttpContext) {
      const data = request.only(['title', 'ingredients', 'instructions', 'image_url'])
      const recipe = await Recipe.findOrFail(params.id)
      recipe.merge(data)
      await recipe.save()
      return response.json(recipe)
    }
  
    public static async destroy({ params, response }: HttpContext) {
      const recipe = await Recipe.findOrFail(params.id)
      await recipe.delete()
      return response.status(204).json(null)
    }
  }