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
            const description = recipe.instructions || '';
            const ingredientsHTML = recipe.extendedIngredients
                ? recipe.extendedIngredients.map(ingredient => `<li>${ingredient.name}</li>`).join('')
                : '';

            const recipeHTML = `
                <h2>${title}</h2>
                <img src="${image}" alt="${title}">
                <ul>
                ${ingredientsHTML}
                </ul>
                <p>${description}</p>
                <button id="back-to-results">Back to Results</button>
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
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h2>${recipe.title}</h2>
            <p>${recipe.description}</p>
            <button onclick="window.location.href='/recipes/${recipe.id}'">View Recipe</button>
        `;
        resultsSection.appendChild(recipeDiv);
    });
    // resultsSection.style.display = 'block';
    document.getElementById('single-recipe');
}
