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

    // Afficher un aperçu de l'image sélectionnée
    function previewImage() {
        const file = photoInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageUrl = e.target.result;
                const imageContainer = document.getElementById('imageContainer');
                imageContainer.innerHTML = '';
                const img = document.createElement('img');
                img.src = imageUrl;
                imageContainer.appendChild(img);
                document.getElementById('addPictureLabel').style.display = 'none';
                document.getElementById('textinfoJs').style.display = 'none';
                document.getElementById('IconJs').style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    }
});