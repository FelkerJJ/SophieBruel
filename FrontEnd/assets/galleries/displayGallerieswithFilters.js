// Variables globales pour stocker les données
let allWorks = [];

// Fonction pour récupérer les données depuis l'API ==> /works(Return all works)
async function getData() {
    const response = await fetch('http://localhost:5678/api/works', {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    console.log('Données récupérées:', data);
    return data;
}

// Fonction pour mettre à jour les galeries d'images
function updateGalleries(filteredWorks) {
    const mainGallery = document.querySelector('.gallery');
    const modalGallery = document.querySelector('#modalGallery');

    mainGallery.innerHTML = '';
    modalGallery.innerHTML = '';

    filteredWorks.forEach(work => {
        const figure = document.createElement('figure');

        // Créer une image
        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;

        // Créer le figcaption pour l'image
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;

        // Ajouter l'image et la figcaption à l'image
        figure.appendChild(img);
        figure.appendChild(figcaption);

        // Ajouter l'image à la galerie principale
        mainGallery.appendChild(figure);

        // Ajouter uniquement l'image à la galerie modale (Galerie Photo)
        const modalImg = img.cloneNode(true); // Définir modalImg ici
        modalGallery.appendChild(modalImg);
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

// Ajoute un gestionnaire d'événements pour les filtres des catégories => Homepage//Mesprojets
async function handleFilterClick(event) {
    const categoryID = event.target.dataset.categoryId;
    const filteredWorks = (categoryID === "all") ? allWorks : allWorks.filter(work => work.categoryId == categoryID);
    updateGalleries(filteredWorks);
}

// Fonction pour récupérer les données localement si elles existent
async function retrieveDataAndUpdateGalleries() {
    // Call direct pour récupérer les données depuis l'API
    await fetchDataAndUpdateGalleries();
    
    // Ajouter les gestionnaires d'événements pour les filtres
    const filterButtons = document.querySelectorAll('.filters-button button');
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });
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

// Appeler la fonction pour récupérer et mettre à jour les données lors du chargement de la page
document.addEventListener('DOMContentLoaded', async () => {
    await retrieveDataAndUpdateGalleries();
});
