document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('photoUploadForm'); 
    const imageInput = document.getElementById('photoInput');
    const titleInput = document.getElementById('titre');
    const categorySelect = document.getElementById('categorie');
    const addPhotoButton = document.getElementById('addPhotoButton');
    const gallery = document.querySelector('.gallery');

    // Fonction pour créer un FormData
    function createFormData(file, title, category) {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);
        formData.append('category', category);
        return formData;
    }

    // Fonction pour envoyer les données à l'API
    async function sendFormData(formData) {
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            body: formData,
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"
            }
        });

        if (!response.ok) {
            throw new Error('Erreur lors de l\'envoi des données');
        }

        const data = await response.json();
        console.log('Données reçues après le POST:', data);
        return data;
    }

    // Fonction pour vérifier la validité du formulaire
    function checkFormValidity() {
        const isPhotoSelected = imageInput.files.length > 0;
        const isTitleFilled = titleInput.value.trim() !== '';
        const isCategorySelected = categorySelect.value !== '';

        if (isPhotoSelected && isTitleFilled && isCategorySelected) {
            addPhotoButton.classList.add('active');
        } else {
            addPhotoButton.classList.remove('active');
        }
    }

    // Fonction pour ajouter la photo à la galerie et à l'API
    function addPhotoToGalleriesAndApi() {
        const file = imageInput.files[0];
        const title = titleInput.value.trim();
        const category = categorySelect.options[categorySelect.selectedIndex].text;

        if (file && title && category) {
            const formData = createFormData(file, title, category);

            // Ajouter la photo à la galerie immédiatement
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageUrl = e.target.result;

                const galleryItem = document.createElement('figure');
                galleryItem.classList.add('gallery-item');
                galleryItem.innerHTML = `<img src="${imageUrl}" alt="${title}">
                                        <figcaption>
                                            <p>${title}</p>
                                            <span class="hidden-category">${category}</span>
                                            </figcaption>`;
                gallery.appendChild(galleryItem);

                form.reset();
                document.getElementById('imageContainer').innerHTML = '';
                document.getElementById('addPictureLabel').style.display = 'block';
                document.getElementById('textinfoJs').style.display = 'block';
                document.getElementById('IconJs').style.display = 'block';
                addPhotoButton.classList.remove('active');
            };
            reader.readAsDataURL(file);

            // Envoyer les données à l'API
            sendFormData(formData)
                .then(data => {
                    console.log('Succès:', data);
                })
                .catch(error => {
                    console.error('Erreur lors de l\'envoi:', error);
                });
        } else {
            console.log('Missing file, title, or category');
        }
    }

    addPhotoButton.addEventListener('click', function () {
        if (addPhotoButton.classList.contains('active')) {
            addPhotoToGalleriesAndApi();
        }
    });

    imageInput.addEventListener('change', checkFormValidity);
    titleInput.addEventListener('input', checkFormValidity);
    categorySelect.addEventListener('change', checkFormValidity);
});
