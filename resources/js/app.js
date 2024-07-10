// Event listener for the recipe form submission
document.getElementById('recipe-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const ingredients = document.getElementById('ingredients').value;
    fetchRecipes(ingredients);
});

// Function to fetch recipes based on the ingredients
function fetchRecipes(ingredients) {
    fetch(`/recipes?ingredients=${encodeURIComponent(ingredients)}`)
        .then(response => response.json())
        .then(data => displayRecipes(data))
        .catch(error => console.error('Error fetching recipes:', error));
}

// Function to view a specific recipe
window.viewRecipe = function(id) {
    console.log('viewRecipe called', id);
    fetch(`/recipes/${id}`)
        .then(response => response.json())
        .then(recipe => {
            const title = recipe.title || 'No title found';
            const image = recipe.image || 'No image found';
            const servings = recipe.servings || '';
            const readyInMinutes = recipe.readyInMinutes || '';
            const description = recipe.instructions || '';
            const ingredientsHTML = recipe.extendedIngredients
                ? recipe.extendedIngredients.map(ingredient => `<li>${ingredient.amount} - $${ingredient.unit} - ${ingredient.name}</li>`).join('')
                : '';

            const recipeHTML = `
                <h2class="text-2xl font-bold mb-2">${title}</h2>
                <img src="${image}" alt="${title} class="w-full h-40 object-cover mb-4 rounded-lg">
                <p class="mb-2">Servings: ${servings}</p>
                <p class="mb-4">Ready in Minutes: ${readyInMinutes}</p>
                <ul class="list-disc list-inside mb-4">
                ${ingredientsHTML}
                </ul>
                <p class="mb-4">${description}</p>
                <button id="back-to-results class="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"">Back to Results</button>
            `;

            const recipeContainer = document.getElementById('single-recipe');
            if (recipeContainer) {
                recipeContainer.innerHTML = recipeHTML;
            } else {
                console.error('Recipe container not found');
            }
        });
}

// Function to display the fetched recipes
function displayRecipes(recipes) {
    console.log('displayRecipes called', recipes);
    const resultsSection = document.getElementById('recipe-results');
    resultsSection.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe', 'bg-white', 'p-6', 'rounded-lg', 'shadow-md', 'hover:shadow-lg', 'transition-shadow', 'duration-300', 'w-full', 'max-w-xs', 'sm:max-w-sm', 'lg:max-w-md', 'mb-6', 'flex', 'flex-col', 'justify-between');
        recipeDiv.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}" class="w-full h-60 object-cover mb-4 rounded-lg shadow-md">
            <h2 class="text-2xl font-bold mb-2 text-gray-700">${recipe.title}</h2>
            <p class="text-gray-600 mb-4"><i class="fa fa-heart"></i>${recipe.likes} </p>
            <button onclick="window.location.href='/recipes/${recipe.id}'" class="border border-black text-black px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-300 mt-auto">View Recipe</button>
        `;
        resultsSection.appendChild(recipeDiv);
    });
    console.log(recipe);
    document.getElementById('single-recipe');
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the form and its elements
    const form = document.getElementById('recipe-form');
    const ingredientsInput = document.getElementById('ingredients');
    const noInputMessage = document.getElementById('no-input-message');
    const recipeResults = document.getElementById('recipe-results');

    // Add event listener for form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const ingredients = ingredientsInput.value.trim();
        // If no ingredients were entered, show a message and hide the results
        if (!ingredients) {
            noInputMessage.style.display = 'block';
            recipeResults.style.display = 'none';
        } else {
            // If ingredients were entered, hide the message and show the results
            noInputMessage.style.display = 'none';
            recipeResults.style.display = 'block';
        }
    });
});


// Add event listener for form submission
document.getElementById('recipe-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var ingredients = document.getElementById('ingredients').value.trim();
  
    // If no ingredients were entered, show a message
    if (ingredients === '') {
      document.getElementById('message').style.display = 'block';
    } else {
        // If ingredients were entered, hide the message
      document.getElementById('message').style.display = 'none';
    }
  });