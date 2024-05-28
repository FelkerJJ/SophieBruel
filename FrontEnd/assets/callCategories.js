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

// Appeler les fonctions pour récupérer et mettre à jour les données et les catégories lors du chargement de la page
document.addEventListener('DOMContentLoaded', async () => {
    await retrieveDataAndUpdateGalleries();
});

// Attendre que le contenu du document soit chargé
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('photoUploadForm');
    const photoInput = document.getElementById('photoInput');
    const titleInput = document.getElementById('titre');
    const categorySelect = document.getElementById('categorie');
    const addPhotoButton = document.getElementById('addPhotoButton');

    // Fonction pour vérifier la validité du formulaire
    function checkFormValidity() {
        const isPhotoSelected = photoInput.files.length > 0;
        const isTitleFilled = titleInput.value.trim() !== '';
        const isCategorySelected = categorySelect.value !== '';

        if (isPhotoSelected && isTitleFilled && isCategorySelected) {
            addPhotoButton.classList.add('active');
        } else {
            addPhotoButton.classList.remove('active');
        }
    }

    // Ajouter des écouteurs d'événements pour vérifier la validité du formulaire
    photoInput.addEventListener('change', checkFormValidity);
    titleInput.addEventListener('input', checkFormValidity);
    categorySelect.addEventListener('change', checkFormValidity);
});
