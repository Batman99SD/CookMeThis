import type { HttpContext } from '@adonisjs/core/http'
import Recipe from '../Models/Recipe.js'
import axios from 'axios'
import env from '#start/env';

export default class RecipesController {
  // Fetch all recipes
  public static async index({ response }: HttpContext) {
    try {
      const recipes = await Recipe.all()
      return response.json(recipes)
    } catch (error) {
      console.error('Error fetching recipes:', error)
      return response.status(500).json({ error: 'Failed to fetch recipes' })
    }
  }

  // Fetch recipes by ingredients
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

  // Fetch random recipes
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

  // Show a specific recipe
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

    // Fetch and save top 100 popular recipes from Spoonacular API
    public static async fetchAndSavePopularRecipes({ response }: HttpContext) {
      try {
        const apiResponse = await axios.get('https://api.spoonacular.com/recipes/random', {
          params: {
            number: 100, // Fetch 100 random recipes
            apiKey: env.get('SPOONACULAR_API_KEY')
          }
        })
  
        const recipes = apiResponse.data.recipes
  
        for (let recipe of recipes) {
          await Recipe.create({
            title: recipe.title,
            description: recipe.summary,
            popularity: recipe.spoonacularScore,
            // Add other fields as needed
          })
        }
  
        console.log('Recipes saved successfully!')
        return response.send('Recipes fetched and saved successfully!')
      } catch (error) {
        console.error('Error fetching recipes from API:', error)
        return response.status(500).json({ error: 'Failed to fetch recipes' })
      }
    }
  
    // Display popular recipes with a random selection of top 3
    public static async popular({ view }: HttpContext) {
      try {
        // Fetch top 100 popular recipes from the database
        const topRecipes = await Recipe.query().orderBy('popularity', 'desc').limit(100).exec()
    
        // Select top 3 recipes randomly from the top 100
        const top3Recipes = this.getRandomRecipes(topRecipes, 3)
    
        return view.render('pages/popular', { topRecipes, top3Recipes })
      } catch (error) {
        console.error('Error fetching recipes from database:', error)
        return view.render('pages/error', { message: 'Failed to fetch popular recipes' })
      }
    }
    
  
    // Helper method to get random recipes
    static getRandomRecipes(recipes: any[], count: number) {
      const shuffled = recipes.sort(() => 0.5 - Math.random())
      return shuffled.slice(0, count)
    }

  // Create a new recipe (not used yet)
  public static async store({ request, response }: HttpContext) {
    const data = request.only(['title', 'ingredients', 'instructions', 'image_url'])
    const recipe = await Recipe.create(data)
    return response.created(recipe)
  }

  // Update an existing recipe (not used yet)
  public static async update({ params, request, response }: HttpContext) {
    const data = request.only(['title', 'ingredients', 'instructions', 'image_url'])
    const recipe = await Recipe.findOrFail(params.id)
    recipe.merge(data)
    await recipe.save()
    return response.json(recipe)
  }

  // Delete a recipe (not used yet)
  public static async destroy({ params, response }: HttpContext) {
    const recipe = await Recipe.findOrFail(params.id)
    await recipe.delete()
    return response.status(204).json(null)
  }
}