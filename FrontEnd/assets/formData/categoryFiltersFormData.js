// Variable vide pour stocker les données
let fetchedcategories = [];

async function getCategories() {
        const response = await fetch('http://localhost:5678/api/categories', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
}

// Function pour mettre à jour le menu déroulant des catégories du formulaire
async function populateCategories() {
    fetchedcategories = await getCategories();
    const select = document.getElementById('categorie');
    const fragment = document.createDocumentFragment();

    // Ajouter une option vide au début du formulaire
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Sélectionnez une catégorie';
    fragment.appendChild(defaultOption);

    // Ajouter les options de catégories du formulaire
    fetchedcategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        fragment.appendChild(option);
    });

    select.appendChild(fragment);
}

document.addEventListener('DOMContentLoaded', function () {
    populateCategories();
});
