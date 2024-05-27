// Variable vide pour stocker les données
let categories = [];

// Fonction pour récupérer les catégories
async function getCategories() {
    const response = await fetch('http://localhost:5678/api/categories', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    return data;
}

// Fonction pour mettre à jour le menu déroulant des catégories
async function populateCategories() {
    categories = await getCategories();
    const select = document.getElementById('categorie');

    // Ajouter une option vide au début
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Sélectionnez une catégorie';
    select.appendChild(defaultOption);

    // Ajouter les options de catégories
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        select.appendChild(option);
    });
}

// Récupère et affiche les catégories lors du chargement de la page
populateCategories();

