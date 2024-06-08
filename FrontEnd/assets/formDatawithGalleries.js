const photoInput = document.getElementById('photoInput');
const titleInput = document.getElementById('titre');
const categorySelect = document.getElementById('categorie');

// Définir la fonction addPhotoToApi en dehors de la portée de DOMContentLoaded
function addPhotoToApi() {
    const file = photoInput.files[0];
    const title = titleInput.value.trim();
    const category = categorySelect.options[categorySelect.selectedIndex].text;

    if (file && title && category) {
        const formData = new FormData();
        formData.append('photo', file);
        formData.append('title', title);
        formData.append('category', category);

        fetch('http://localhost:5678/api/users/works', {
            method: 'POST',
            body: formData,
            headers: {
                "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json(); 
            } else {
                throw new Error('Erreur lors de l\'envoi des données');
            }
        })
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('photoUploadForm');
    const addPhotoButton = document.getElementById('addPhotoButton');
    const gallery = document.querySelector('.gallery');

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

    // Fonction pour ajouter la photo aux galeries et au localStorage
    function addPhotoToGalleries() {
        const file = photoInput.files[0];
        const title = titleInput.value.trim();
        const category = categorySelect.options[categorySelect.selectedIndex].text;

        if (file && title && category) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageUrl = e.target.result;

                // Ajouter la photo à la galerie principale
                const galleryItem = document.createElement('figure');
                galleryItem.classList.add('gallery-item');
                galleryItem.innerHTML = `<img src="${imageUrl}" alt="${title}">
                                        <figcaption>
                                            <p>${title}</p>
                                            <span class="hidden-category">${category}</span>
                                            </figcaption>`;
                gallery.appendChild(galleryItem);

                // Réinitialiser le formulaire
                form.reset();
                document.getElementById('imageContainer').innerHTML = '';
                document.getElementById('addPictureLabel').style.display = 'block';
                document.getElementById('textinfoJs').style.display = 'block';
                document.getElementById('IconJs').style.display = 'block';
                addPhotoButton.classList.remove('active');

                // Appeler la fonction pour stocker les données de l'image dans le localStorage
                storeImageData(title, category, imageUrl);
            };
            reader.readAsDataURL(file);
        }
    }

    // Ajouter l'écouteur d'événements pour le bouton Ajouter une photo
    addPhotoButton.addEventListener('click', function () {
        if (addPhotoButton.classList.contains('active')) {
            addPhotoToGalleries();
        }
    });

    // Fonction pour stocker les données de l'image dans le localStorage
    function storeImageData(title, category, imageUrl) {
        let imageData = JSON.parse(localStorage.getItem('images')) || [];
        imageData.push({ title, category, imageUrl });
        localStorage.setItem('images', JSON.stringify(imageData));
    }

    // Fonction pour récupérer les données d'images depuis le localStorage
    function getStoredImages() {
        return JSON.parse(localStorage.getItem('images')) || [];
    }

    // Fonction pour afficher les images depuis le localStorage
    function displayStoredImages() {
        const storedImages = getStoredImages();
        storedImages.forEach(imageData => {
            const { title, category, imageUrl } = imageData;

            // Ajouter la photo à la galerie principale
            const galleryItem = document.createElement('div');
            galleryItem.classList.add('gallery-item');
            galleryItem.innerHTML = `<img src="${imageUrl}" alt="${title}">
                                    <p>${title}</p>
                                    <span class="hidden-category">${category}</span>`;
            gallery.appendChild(galleryItem);
        });
    }

    // Appel de la fonction pour afficher les images stockées lors du chargement de la page
    displayStoredImages();

    // Ajouter des écouteurs d'événements pour vérifier la validité du formulaire
    photoInput.addEventListener('change', checkFormValidity);
    titleInput.addEventListener('input', checkFormValidity);
    categorySelect.addEventListener('change', checkFormValidity);
});