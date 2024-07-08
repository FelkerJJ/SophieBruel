document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('photoUploadForm'); 
    const imageInput = document.getElementById('photoInput');
    const titleInput = document.getElementById('titre');
    const categorySelect = document.getElementById('categorie');
    const addPhotoButton = document.getElementById('addPhotoButton');
    const gallery = document.querySelector('.gallery');
    const modalGallery = document.querySelector('#modalGallery');

    // Function pour créer un objet FormData avec les données du formulaire
    function createFormData(file, title, category) {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);
        formData.append('category', category);
        return formData;
    }

    async function sendFormData(formData) {
        const token = getSession();
        try {
            const response = await fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`                
                },
                body: formData,
            });
            const data = await response.json();
            return data;
        } catch (error) {
            throw error;
        }
    }

    // Function pour vérifier la validité du formulaire
    function checkFormValidity() {
        const isPhotoSelected = imageInput.files.length > 0;
        const isTitleFilled = titleInput.value.trim() !== '';
        const isCategorySelected = categorySelect.value.trim() !== '';

        if (isPhotoSelected && isTitleFilled && isCategorySelected) {
            addPhotoButton.classList.add('active');
        } else {
            addPhotoButton.classList.remove('active');
        }
    }

    // Function pour ajouter une photo aux galeries et à l'API
    function addPhotoToGalleriesAndApi() {
        const file = imageInput.files[0];
        const title = titleInput.value.trim();
        const category = parseInt(categorySelect.value, 10);
    
        const token = getSession();
        if (!token) {
            console.error('User not logged in');
            return;
        }
    
        // Vérifie que le fichier, le titre et la catégorie sont valides
        if (file && title && !isNaN(category)) {
            const formData = createFormData(file, title, category);

            sendFormData(formData)
                .then(data => {
                    // Ajoute la photo à la galerie principale après une réponse réussie de l'API                    
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const imageUrl = e.target.result;

                        // Ajoute à la galerie principale
                        const galleryItem = document.createElement('figure');
                        galleryItem.classList.add('gallery-item');
                        galleryItem.innerHTML = `<img src="${imageUrl}" alt="${title}">
                                                <figcaption>
                                                    <p>${title}</p>
                                                </figcaption>`;
                        gallery.appendChild(galleryItem);

                        // Ajoute à la galerie modale l'icône poubelle
                        if (!modalGallery.querySelector(`[data-item-id="${data.id}"]`)) {
                            const modalImg = document.createElement('img');
                            modalImg.src = imageUrl;
                            modalImg.alt = title;

                            const trashIcon = document.createElement('i');
                            trashIcon.classList.add('fa-solid', 'fa-trash-can');
                            trashIcon.dataset.itemId = data.id;

                            const imageContainer = document.createElement('div');
                            imageContainer.classList.add('image-container');
                            imageContainer.dataset.itemId = data.id;
                            imageContainer.appendChild(trashIcon);
                            imageContainer.appendChild(modalImg);
                            modalGallery.appendChild(imageContainer);

                            trashIcon.addEventListener('click', function() {
                                deleteImage(data.id);
                            });
                        }

                        // Réinitialise le formulaire et les éléments de l'interface utilisateur
                        form.reset();
                        document.getElementById('imageContainer').innerHTML = '';
                        document.getElementById('addPictureLabel').style.display = 'block';
                        document.getElementById('textinfoJs').style.display = 'block';
                        document.getElementById('IconJs').style.display = 'block';
                        addPhotoButton.classList.remove('active');
                    };
                    reader.readAsDataURL(file);
                })
                .catch(error => {
                    console.error('Error sending data to API:', error);
                });
        } else {
            console.log('Missing file, title, or category');
        }
    }

    // Ajoute un gestionnaire d'événements au bouton d'ajout de photo
    addPhotoButton.addEventListener('click', function () {
        if (addPhotoButton.classList.contains('active')) {
            addPhotoToGalleriesAndApi();
        }
    });

    // Ajoute des gestionnaires d'événements pour vérifier la validité du formulaire
    imageInput.addEventListener('change', checkFormValidity);
    titleInput.addEventListener('input', checkFormValidity);
    categorySelect.addEventListener('change', checkFormValidity);
});

function getSession() {
    return localStorage.getItem('sessionToken');
}
