const form = document.querySelector('form');
let actualrecipeid = null
let OpenModal = document.querySelector(".OpenModal")
let myModal = document.querySelector(".myModal")
let overlay = document.querySelector(".overlay")
let closeModal = document.querySelector(".closeModal")
let divPourDisplayForm = document.querySelector(".divPourDisplayForm");
let AddRecipeForm = document.querySelector('#form')
const modifyForm = document.querySelector("#modify-form");
let addRecipeTitle = document.querySelector(".addRecipeTitle")
let modifybuttonModal = document.querySelector(".modifybuttonModal")
let closeModalAddRecipeForm = document.querySelector(".closeModalAddRecipeForm")
// ajouter une nouvelle recette (utilisateur) //
function createNewRecipe() {
    let obj = {
        title: document.querySelector("#title").value,
        ingredients: document.querySelector("#ingredients").value.split(","),
        instructions: document.querySelector("#instructions").value,
        timePrep: document.querySelector("#timePrep").value,
        timeCook: document.querySelector("#timeCook").value,
        difficulty: document.querySelector("#difficulty").value,
        category: document.querySelector("#category").value,
    }
    fetch("http://127.0.0.1:3000/recipes", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(obj)
    }
    ).then((response) => {
        response.json().then((data) => {
            if (response.ok) {
                console.log("requette envoyée");
                console.log(data);
                getAllRecipes();

            } else {
                console.log("requette non envoyée")
            }
        })
    })
    divPourDisplayForm.style.display = 'none'

}



// récupérer les recettes disponibles sur l'API // 
function getAllRecipes() {
    fetch("http://127.0.0.1:3000/recipes", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    })
        .then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    const recettesList = document.getElementById('recipes-list');
                    recettesList.innerHTML = '';
                    console.log("Recettes récupérées avec succès");


                    data.recipes.forEach((recipe) => {
                        displayRecipes(recipe)
                    })
                });
            } else {
                console.log("Erreur lors de la récupération des recettes");
            }
        })
        .catch((error) => {
            console.log("Erreur : ", error);
        });
}
getAllRecipes();
// Afficher toutes les recettes disponibles // 

function displayRecipes(recipe) {
    const recipesList = document.querySelector("#recipes-list");
    const recipeList = document.createElement("div");
    recipeList.classList.add("RecipeDiv");

    recipeList.innerHTML = `
              <h2 class="recipeTitle">${recipe.title}</h2>
              <div class="divForDisplay" >
                <p> Ingredients : ${recipe.ingredients.join()}</p>
                <p>Instructions : ${recipe.instructions}</p>
                <p>Temps de préparation : ${recipe.timePrep}</p>
                <p>Temps de cuisson : ${recipe.timeCook}</p>
                <p>Degré de difficulté : ${recipe.difficulty}</p>
                <p>Catégorie : ${recipe.category}</p>
                <button class="deletebutton" onclick="deleteRecipe('${recipe._id}')">supprimer</button>
                <button class="modifybutton" onclick="OpenModifyForm('${recipe._id}')">modifier</button>
              </div>
            `;
    const recipeTitle = document.querySelectorAll(".recipeTitle")

    recipeList.addEventListener("click", () => {
        const divForDisplay = recipeList.querySelector(".divForDisplay");
        divForDisplay.style.display = divForDisplay.style.display === 'none' ? 'block' : 'none';

    });

    recipesList.appendChild(recipeList);
}







function deleteRecipe(id) {
    fetch(`http://127.0.0.1:3000/recipes/` + id, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
        }

    }).then(response => {
        if (response.ok) {
            console.log("recettes supprimée")
            getAllRecipes()
        }

    })
}

// ouvrir form de modification onclick "modifier"// 
async function OpenModifyForm(recipeId) {
    const res = await fetch('http://127.0.0.1:3000/recipes/' + recipeId)
    const data = await res.json()

    myModal.style.display = "block"
    overlay.style.display = "block";


    modifyForm.style.display = "block";
    let titleInput = document.getElementById('updatetitle');
    let ingredientsInput = document.getElementById('updateIngredients')
    let instructionsInput = document.getElementById('updateinstructions');
    let timePrepInput = document.getElementById('updatetimePrep');
    let timeCookInput = document.getElementById('updatetimeCook');
    let difficultyInput = document.getElementById('updatedifficulty');
    let categoryInput = document.getElementById('updatecategory');


    // attribution de valeurs // 
    titleInput.value = data.recipe.title;
    ingredientsInput.value = data.recipe.ingredients;
    instructionsInput.value = data.recipe.instructions;
    timePrepInput.value = data.recipe.timePrep;
    timeCookInput.value = data.recipe.timeCook;
    difficultyInput.value = data.recipe.difficulty;
    categoryInput.value = data.recipe.category;
    actualrecipeid = data.recipe._id



}


function updateRecipe() {

    console.log("je suis dans la fonction")
    const recipeId = actualrecipeid

    // Création d'un objet
    let recipeData = {
        title: updatetitle.value,
        ingredients : updateIngredients.value.split(","),
        instructions: updateinstructions.value,
        timePrep: updatetimePrep.value,
        timeCook: updatetimeCook.value,
        difficulty: updatedifficulty.value,
        category: updatecategory.value
    };
    // envoi de la requette de MAJ // 
    fetch('http://127.0.0.1:3000/recipes/' + recipeId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipeData)
    }).then(response => {
        if (!response.ok) {
            console.log("response OK")
            return response.json().then(data => {
                throw data;
            })
        }
        return response.json()
    }
    ).then(data => {
        // Affichage de la recette mise à jour
        getAllRecipes()
        console.log("recette mise a jour ")
    })
        .catch(error => {
            // Gestion des erreurs
            console.log("Erreur lors de la mise à jour de la recette :", error);
            // Affichage d'un message d'erreur à l'utilisateur
            alert("Erreur lors de la mise à jour de la recette. Veuillez réessayer.");
        })

}

addRecipeTitle.addEventListener("click", () => {

    divPourDisplayForm.style.display = 'block'
})







closeModal.addEventListener("click", () => {
    myModal.style.display = "none"
    overlay.style.display = "none";
    modifyForm.style.display = "none";
})



modifybuttonModal.addEventListener("click", () => {
    myModal.style.display = "none";
    overlay.style.display = "none";


})

closeModalAddRecipeForm.addEventListener("click", () => {
    divPourDisplayForm.style.display = "none"
})