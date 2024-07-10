# CookMeThis Application

## Authors
- Abdelaziz Ali Mohamed - 'azozkrg1@gmail.com'
- Wafaa Gaafar - 'wagaagaafar@gmail.com'

## Overview
CookMeThis is a culinary platform designed to help users discover and share recipes. It offers a wide range of recipes from various cuisines, enabling users to explore, experiment, and enhance their cooking skills. The application provides functionalities to view random recipes, search recipes by ingredients, and read culinary blogs.

## Features
- **Home Page:** A welcoming page that introduces users to the CookMeThis platform.
- **Recipe Search:** Users can search for recipes based on specific ingredients.
- **Blog:** A section where users can read about culinary tips, tricks, and insights.
- **Popular Recipes:** Highlights popular recipes on the platform.
- **Recipe Management:** Users can create, update, and delete recipes (for authorized users).

## Technologies Used
- **AdonisJS:** A Node.js web framework used for building the server-side of the application.
- **Edge Template Engine:** Used for rendering the HTML views.
- **Tailwind CSS:** A utility-first CSS framework for styling the application.
- **Axios:** A promise-based HTTP client for making API requests.
- **SQLite:** A lightweight database used for storing recipe data.

## Getting Started
To get started with the CookMeThis application, follow these steps:

1. **Clone the repository:**
git clone https://github.com/Batman99SD/CookMeThis.git
2. **Install dependencies:**
cd CookMeThis 
npm install

3. **Set up the environment variables:**
- Copy the `.env.example` file to `.env` and fill in the necessary details.

4. **Run migrations:**
node ace migration:run

5. **Start the application:**
npm run dev

The application will be available at `https://cookmethis.onrender.com/`.
