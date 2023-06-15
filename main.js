const searchForm = document.querySelector('form')
const searchResultDiv = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery ='';
const APP_ID = 'e93fee35';
const APP_KEY = '90ccb5dafab9698988e5216fa0cbd2b5';
 

searchForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    searchQuery = e.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI(){
    const baseURL =`https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
}

function generateHTML(results){
    let generatedHTML ='';
    results.map(result =>{
        generatedHTML +=
        `
        <div class="item">
        <img src="${result.recipe.image}" alt="">
        <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>

        </div>
        <p class="item-data">Calories :${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet Label :${result.recipe.dietLabels} :</p>
        <p class="item-data">Health Label :${result.recipe.healthLabels} :</p>
    </div>

        `

    })
    searchResultDiv.innerHTML=generatedHTML;
}