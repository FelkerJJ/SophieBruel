//Start from here
function updateGalleries(filteredWorks) {
    const mainGallery = document.querySelector('.gallery');
    const modalGallery = document.querySelector('#modalGallery');

    mainGallery.innerHTML = '';
    modalGallery.innerHTML = '';

    filteredWorks.forEach(work => {
        const figure = document.createElement('figure');

        // Create an image
        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;

        // Create the figcaption for the image
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;

        // Add the image and figcaption to the figure
        figure.appendChild(img);
        figure.appendChild(figcaption);

        // Add the figure to the main gallery
        mainGallery.appendChild(figure);

        // Add the image and the trash icon to the modal gallery
        const modalImg = img.cloneNode(true); // Clone the main image
        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa-solid', 'fa-trash-can'); // Add classes for the trash icon
        trashIcon.dataset.itemId = work.id; // Set the data-item-id attribute
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');
        imageContainer.appendChild(trashIcon);
        imageContainer.appendChild(modalImg);
        modalGallery.appendChild(imageContainer);

        // Add event listener to delete the image on trash icon click
        trashIcon.addEventListener('click', function() {
            deleteImage(work.id);
        });
    });
}


async function deleteImage(workId) {
    const token = getSession();

    if (!token) {
        console.error('User not logged in');
        return;
    }

    try {
        const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            // Remove the image from the DOM
            const imageContainer = document.querySelector(`[data-item-id="${workId}"]`);
            if (imageContainer) {
                imageContainer.parentElement.removeChild(imageContainer);
            } else {
                console.error('Image container not found');
            }
        } else {
            console.error('Failed to delete image');
        }
    } catch (error) {
        console.error('Error deleting image:', error);
    }
}
