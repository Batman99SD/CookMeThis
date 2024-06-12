import axios from 'axios';

class SpoonacularService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.SPOONACULAR_API_KEY || '';
  }

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