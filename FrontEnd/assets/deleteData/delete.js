async function deleteImage(workId, filteredWorks) {
    const token = getSession();

    if (!token) {
        console.error('User not logged in');
        return;
    }

    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        const imageContainer = document.querySelector(`[data-item-id="${workId}"]`);
        if (imageContainer) {
            imageContainer.parentElement.removeChild(imageContainer);
        } else {
            console.error('Image container not found');
        }
        // Mettre à jour filteredWorks après suppression
        const updatedWorks = filteredWorks.filter(work => work.id !== workId);
        updateGalleries(updatedWorks);
    } else {
        console.error('Failed to delete image');
    }
}

function updateGalleries(filteredWorks) {
    const mainGallery = document.querySelector('.gallery'); 
    const modalGallery = document.querySelector('#modalGallery'); 

    mainGallery.innerHTML = ''; 
    modalGallery.innerHTML = ''; 

    filteredWorks.forEach(work => {
        const figure = document.createElement('figure'); 

        const img = document.createElement('img');
        img.src = work.imageUrl; 
        img.alt = work.title; 

        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title; 

        figure.appendChild(img);
        figure.appendChild(figcaption);
        mainGallery.appendChild(figure);

        const modalImg = img.cloneNode(true); 
        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa-solid', 'fa-trash-can'); 
        trashIcon.dataset.itemId = work.id; 

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container'); 
        imageContainer.dataset.itemId = work.id; 
        imageContainer.appendChild(trashIcon); 
        imageContainer.appendChild(modalImg); 
        modalGallery.appendChild(imageContainer); 

        trashIcon.addEventListener('click', function() {
            deleteImage(work.id, filteredWorks); 
        });
    });
}