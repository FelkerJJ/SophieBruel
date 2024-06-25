// Requête "delete" à l'API 
async function deleteImage(workId) {
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
        } else {
            console.error('Failed to delete image');
    }
}


function updateGalleries(filteredWorks) {
    const mainGallery = document.querySelector('.gallery'); 
    const modalGallery = document.querySelector('#modalGallery'); 

    mainGallery.innerHTML = ''; 
    modalGallery.innerHTML = ''; 

    // Itère sur le tableau des œuvres filtrées
    filteredWorks.forEach(work => {
        const figure = document.createElement('figure'); 

        // Crée un élément image pour la figure
        const img = document.createElement('img');
        img.src = work.imageUrl; // Définit l'URL source de l'image
        img.alt = work.title; // Définit le texte alternatif de l'image

        // Crée un élément figcaption pour l'image
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title; 

        // Ajoute l'image et le figcaption à la figure
        figure.appendChild(img);
        figure.appendChild(figcaption);

        // Ajoute la figure à la galerie principale
        mainGallery.appendChild(figure);

        // Ajoute l'image et l'icône de la corbeille à la galerie modale
        const modalImg = img.cloneNode(true); 
        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa-solid', 'fa-trash-can'); // Ajoute des classes pour l'icône de la corbeille
        trashIcon.dataset.itemId = work.id; // Définit l'attribut data-item-id avec l'ID de l'œuvre
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container'); 
        imageContainer.appendChild(trashIcon); 
        imageContainer.appendChild(modalImg); 
        modalGallery.appendChild(imageContainer); 

        // Ajoute un écouteur d'événements pour supprimer l'image lorsque l'icône de la corbeille est cliquée
        trashIcon.addEventListener('click', function() {
            deleteImage(work.id); 
        });
    });
}
