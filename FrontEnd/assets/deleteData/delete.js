// Variables globales pour stocker les données
let allWorks = [];

// Fonction pour récupérer les données depuis l'API ==> /works (Return all works)
async function getData() {
    const response = await fetch('http://localhost:5678/api/works', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    return data;
}

// Fonction pour mettre à jour les galeries d'images
function updateGalleries(filteredWorks) {
    const mainGallery = document.querySelector('.gallery');
    const modalGallery = document.querySelector('#modalGallery');

    mainGallery.innerHTML = '';
    modalGallery.innerHTML = '';

    filteredWorks.forEach(work => {
        // Ajouter l'image à la galerie principale
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;
        img.setAttribute('data-item-id', work.id);

        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        mainGallery.appendChild(figure);

        // Ajouter l'image à la galerie modale avec l'icône de poubelle
        const modalImg = document.createElement('img');
        modalImg.src = work.imageUrl;
        modalImg.alt = work.title;
        modalImg.setAttribute('data-item-id', work.id);

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
            deleteImage(work.id);
        });
    });
}

// Fonction pour récupérer les données depuis l'API et les mettre à jour
async function fetchDataAndUpdateGalleries() {
    try {
        const data = await getData();
        allWorks = data;
        updateGalleries(allWorks);
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

// Fonction pour récupérer les données et mettre à jour les galeries au chargement de la page
async function retrieveDataAndUpdateGalleries() {
    await fetchDataAndUpdateGalleries();
    const filterButtons = document.querySelectorAll('.filters-button button');
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });
}

// Gestionnaire d'événements pour les filtres des catégories => Homepage/Mesprojets
async function handleFilterClick(event) {
    const categoryID = event.target.dataset.categoryId;
    const filteredWorks = (categoryID === "all") ? allWorks : allWorks.filter(work => work.categoryId == categoryID);
    updateGalleries(filteredWorks);
}

// Fonction pour supprimer une image
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
        // Supprimer l'image de la modale
        const imageContainer = document.querySelector(`[data-item-id="${workId}"]`);
        if (imageContainer) {
            imageContainer.parentElement.removeChild(imageContainer);
        } else {
            console.error('Image container not found in modal');
        }

        // Mettre à jour les galeries pour refléter la suppression
        await fetchDataAndUpdateGalleries();
    } else {
        console.error('Failed to delete image');
    }
}

// Gestionnaire d'événements pour soumettre le formulaire d'ajout d'image
async function handleImageUpload(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
        const imageData = await uploadNewImage(formData);
        addNewWork(imageData);
        event.target.reset();
    } catch (error) {
        console.error('Erreur lors du traitement de l\'image:', error);
    }
}

// Appel initial pour récupérer les données et mettre à jour les galeries au chargement de la page
document.addEventListener('DOMContentLoaded', async () => {
    await retrieveDataAndUpdateGalleries();
});
