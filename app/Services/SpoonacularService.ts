import axios from 'axios';

/**
 * Service class for interacting with the Spoonacular API.
 */
class SpoonacularService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.SPOONACULAR_API_KEY || '';
  }

  /**
   * Retrieves recipes based on ingredients.
   * @returns A Promise that resolves to the response data.
   * @throws An error if there is an issue fetching the recipes.
   */
  public async getRecipesByIngredients() {
    try {
      const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
        params: {
          ingredients: "tomato", //ingredients.join(','),
          apiKey: this.apiKey,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching recipes');
    }
  }
}

export default new SpoonacularService();