import { recipes } from "./recipes.mjs"

const recipesElement = document.querySelector(".recipes")
function renderRecipes(recipeList) {
	recipesElement.innerHTML = recipeList.map((recipe) => recipeTemplate(recipe)).join("")
}

function recipeTemplate(recipe) {
	return `<section class="recipe">
        <img src="${recipe.image}" alt="${recipe.name}" />
        <div>
            <div class="tags">
                ${recipe.tags.map((tag) => `<div>${tag}</div>`).join("")}
            </div>
            <h2>${recipe.name}</h2>
            <div class="rating">
                ${[...Array(5).keys()].map((e) => `<span aria-hidden="true" class="icon-star${e < recipe.rating ? '">⭐' : '-empty">☆'}</span>`).join("")}
            </div>
            <p class="description">${recipe.description}</p>
        </div>
    </section>`
}

function getRandomElement(array) {
	return array[Math.floor(Math.random() * array.length)]
}

// init
renderRecipes([getRandomElement(recipes)])

const searchInput = document.querySelector(".search input")
const searchButton = document.querySelector(".search img")
searchButton.addEventListener("click", (e) => {
	e.preventDefault()
	const query = searchInput.value.toLowerCase()
	const results = recipes.filter((recipe) => recipe.name.toLowerCase().includes(query) || recipe.description.toLowerCase().includes(query) || recipe.tags.some((tag) => tag.toLowerCase().includes(query))).sort((a, b) => a.name.localeCompare(b.name))
	renderRecipes(results)
})
