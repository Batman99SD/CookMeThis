import type { HttpContext } from '@adonisjs/core/http'
import Recipe from '../Models/Recipe.js'
import axios from 'axios'

export default class RecipesController {
    public static async index({ response }: HttpContext) {
      try {
        console.log('Reached before Recipe.all()');
        const recipes = await Recipe.all()
        console.log('Reached after Recipe.all()');
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
              apiKey: '25d500381568422286058b52ef7a2a70'
            }
          })
          return response.json(apiResponse.data)
        } catch (error) {
          console.error('Error fetching recipes from API:', error)
          return response.status(500).json({ error: 'Failed to fetch recipes' })
        }
      }

      public static async show({ request, response}: HttpContext) {
        const id = request.param('id');
        try {
          const apiResponse = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
            params: {
              id,
              includeNutrition: false,
              addWinePairing: false,
              addTasteData: false,
              apiKey: '25d500381568422286058b52ef7a2a70'
            }
          })
          return response.json(apiResponse.data)
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
  
   /**  public static async show({ params, response }: HttpContext) {
      const recipe = await Recipe.findOrFail(params.id)
      return response.json(recipe)
    }**/
  
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