console.log('Hello World')

document.getElementById('recipe-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const ingredients = document.getElementById('ingredients').value;
    fetchRecipes(ingredients);
});

function fetchRecipes(ingredients) {
    fetch(`/recipes?ingredients=${encodeURIComponent(ingredients)}`)
        .then(response => response.json())
        .then(data => displayRecipes(data))
        .catch(error => console.error('Error fetching recipes:', error));
}

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
            <p class="text-gray-600 mb-4">${recipe.likes} likes</p>
            <button onclick="window.location.href='/recipes/${recipe.id}'" class="border border-black text-black px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors duration-300 mt-auto">View Recipe</button>
        `;
        resultsSection.appendChild(recipeDiv);
    });
    // resultsSection.style.display = 'block';
    console.log(recipe);
    document.getElementById('single-recipe');
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recipe-form');
    const ingredientsInput = document.getElementById('ingredients');
    const noInputMessage = document.getElementById('no-input-message');
    const recipeResults = document.getElementById('recipe-results');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const ingredients = ingredientsInput.value.trim();

        if (!ingredients) {
            noInputMessage.style.display = 'block';
            recipeResults.style.display = 'none';
        } else {
            noInputMessage.style.display = 'none';
            recipeResults.style.display = 'block';
        }
    });
});

document.getElementById('recipe-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var ingredients = document.getElementById('ingredients').value.trim();
  
    if (ingredients === '') {
      document.getElementById('message').style.display = 'block';
    } else {
      document.getElementById('message').style.display = 'none';
    }
  });

  function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
  