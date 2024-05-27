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

const addButton = document.querySelector('.addPicture-button');

addButton.addEventListener('click', function() {
});
