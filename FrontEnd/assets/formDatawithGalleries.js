document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('photoUploadForm');
    const photoInput = document.getElementById('photoInput');
    const titleInput = document.getElementById('titre');
    const categorySelect = document.getElementById('categorie');
    const addPhotoButton = document.getElementById('addPhotoButton');
    const gallery = document.querySelector('.gallery');
    const modalGallery = document.querySelector('.modal-gallery .image-container');

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

                // Ajouter la photo à la galerie modale
                const modalGalleryItem = document.createElement('figure');
                modalGalleryItem.classList.add('modal-gallery-item');
                modalGalleryItem.innerHTML = `<img src="${imageUrl}" alt="${title}">
                                        <figcaption>
                                            <p>${title}</p>
                                            <span class="hidden-category">${category}</span>
                                        </figcaption>`;

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

            // Ajouter la photo à la galerie modale
            const modalGalleryItem = document.createElement('div');
            modalGalleryItem.classList.add('modal-gallery-item');
            modalGalleryItem.innerHTML = `<img src="${imageUrl}" alt="${title}">
                                          <p>${title}</p>
                                          <span class="hidden-category">${category}</span>`;
        });
    }

    // Appel de la fonction pour afficher les images stockées lors du chargement de la page
    displayStoredImages();

    // Ajouter des écouteurs d'événements pour vérifier la validité du formulaire et afficher l'aperçu de l'image
    photoInput.addEventListener('change', () => {
        checkFormValidity();
        previewImage();
    });
    titleInput.addEventListener('input', checkFormValidity);
    categorySelect.addEventListener('change', checkFormValidity);
});
