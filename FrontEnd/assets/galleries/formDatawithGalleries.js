document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('photoUploadForm'); 
    const imageInput = document.getElementById('photoInput');
    const titleInput = document.getElementById('titre');
    const categorySelect = document.getElementById('categorie');
    const addPhotoButton = document.getElementById('addPhotoButton');
    const gallery = document.querySelector('.gallery');
    const modalGallery = document.querySelector('#modalGallery');

    // Function to create FormData
    function createFormData(file, title, category) {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);
        formData.append('category', category);
        return formData;
    }

    // Function to send data to the API
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

    // Function to check form validity
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

    // Function to add photo to gallery and API
    function addPhotoToGalleriesAndApi() {
        const file = imageInput.files[0];
        const title = titleInput.value.trim();
        const category = parseInt(categorySelect.value, 10);
    
        const token = getSession();
        if (!token) {
            console.error('User not logged in');
            return;
        }
    
        if (file && title && !isNaN(category)) {
            const formData = createFormData(file, title, category);

            sendFormData(formData)
                .then(data => {
                    // Add photo to gallery only after receiving a successful response from the API
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        const imageUrl = e.target.result;

                        // Add to main gallery
                        const galleryItem = document.createElement('figure');
                        galleryItem.classList.add('gallery-item');
                        galleryItem.innerHTML = `<img src="${imageUrl}" alt="${title}">
                                                <figcaption>
                                                    <p>${title}</p>
                                                </figcaption>`;
                        gallery.appendChild(galleryItem);

                        // Add to modal gallery with trash icon if not already added
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

    addPhotoButton.addEventListener('click', function () {
        if (addPhotoButton.classList.contains('active')) {
            addPhotoToGalleriesAndApi();
        }
    });

    imageInput.addEventListener('change', checkFormValidity);
    titleInput.addEventListener('input', checkFormValidity);
    categorySelect.addEventListener('change', checkFormValidity);
});

function getSession() {
    return localStorage.getItem('sessionToken');
}
