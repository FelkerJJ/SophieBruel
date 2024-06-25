document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('photoUploadForm'); 
    const imageInput = document.getElementById('photoInput');
    const titleInput = document.getElementById('titre');
    const categorySelect = document.getElementById('categorie');
    const addPhotoButton = document.getElementById('addPhotoButton');
    const gallery = document.querySelector('.gallery');

    // Function to create FormData
    function createFormData(file, title, category) {
        // console.log('Creating FormData');
        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', title);
        formData.append('category', category);
        return formData;
    }

    // Function to send data to the API
    async function sendFormData(formData) {
        // console.log('Sending FormData to API');
        const token = getSession(); 
        // console.log('Session token:', token);
        try {
            const response = await fetch('http://localhost:5678/api/works', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`                
                },
                body: formData,
            });

            // console.log('API response:', response); 

            const data = await response.json();
            // console.log('Data received after POST:', data);
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
        // console.log('Adding photo to gallery and API');
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
    
            // console.log('Created FormData:', formData);
    
            // Add photo to gallery immediately
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
    
                // Add to modal gallery with trash icon
                const modalGallery = document.querySelector('#modalGallery');
                const modalImg = document.createElement('img');
                modalImg.src = imageUrl;
                modalImg.alt = title;
    
                const trashIcon = document.createElement('i');
                trashIcon.classList.add('fa-solid', 'fa-trash-can');
                trashIcon.dataset.itemId = 'new-image'; // Set a temporary ID or handle accordingly
    
                const imageContainer = document.createElement('div');
                imageContainer.classList.add('image-container');
                imageContainer.dataset.itemId = 'new-image'; // Set a temporary ID or handle accordingly
                imageContainer.appendChild(trashIcon);
                imageContainer.appendChild(modalImg);
                modalGallery.appendChild(imageContainer);
    
                trashIcon.addEventListener('click', function() {
                    // Placeholder function for now
                    console.log('Delete new image functionality not implemented yet.');
                });
    
                form.reset();
                document.getElementById('imageContainer').innerHTML = '';
                document.getElementById('addPictureLabel').style.display = 'block';
                document.getElementById('textinfoJs').style.display = 'block';
                document.getElementById('IconJs').style.display = 'block';
                addPhotoButton.classList.remove('active');
            };
            reader.readAsDataURL(file);
    
            // Send data to API
            sendFormData(formData)
                .then(data => {
                    // Update the new image's dataset.itemId with the real ID from the API
                    const newImageContainer = modalGallery.querySelector('[data-item-id="new-image"]');
                    if (newImageContainer) {
                        newImageContainer.dataset.itemId = data.id;
                        newImageContainer.querySelector('i').dataset.itemId = data.id;
                        newImageContainer.querySelector('i').addEventListener('click', function() {
                            deleteImage(data.id, filteredWorks);
                        });
                    }
                })
                .catch(error => {
                    console.error('Error sending data to API:', error);
                });
        } else {
            console.log('Missing file, title, or category');
        }
    }
    

    addPhotoButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the page from reloading
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


