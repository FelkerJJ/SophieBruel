// Variable vide pour stocker les données
let allWorks = [];

// Fonction pour récupérer les données depuis l'API
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

// Gestionnaire d'événements pour les filtres via l'ID
async function handleFilterClick(event) {
    const categoryID = event.target.dataset.categoryId;
    const filteredWorks = (categoryID === "all") ? allWorks : allWorks.filter(work => work.categoryId == categoryID);
    updateGallery('.gallery', filteredWorks); // Mettre à jour la galerie principale
    updateGallery('.modal-gallery', filteredWorks); // Mettre à jour la galerie modale avec les mêmes données filtrées
}

// Mettre à jour la galerie principale avec toutes les informations
function updateMainGallery(filteredWorks) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';
    filteredWorks.forEach(work => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;
        figure.appendChild(img);
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}

// Mettre à jour la galerie modale avec les images uniquement
function updateModalGallery(filteredWorks) {
    const gallery = document.querySelector('.modal-gallery');
    gallery.innerHTML = '';
    filteredWorks.forEach(work => {
        const img = document.createElement('img');
        img.src = work.imageUrl;
        gallery.appendChild(img);
    });
}

// Récupère les données lors du chargement de la page et met à jour les galeries
async function fetchDataAndUpdateGalleries() {
    try {
        const data = await getData(); // Récupérer les données depuis l'API
        allWorks = data; // Mettre à jour la variable globale
        updateMainGallery(allWorks); // Mettre à jour la galerie principale
        updateModalGallery(allWorks); // Mettre à jour la galerie modale
        // Stocker les données localement dans le navigateur
        localStorage.setItem('allWorks', JSON.stringify(allWorks));
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

// Récupérer les données localement si elles existent, sinon les récupérer à partir de l'API
async function retrieveDataAndUpdateGalleries() {
    const storedData = localStorage.getItem('allWorks');
    if (storedData) {
        allWorks = JSON.parse(storedData);
        updateMainGallery(allWorks); // Mettre à jour la galerie principale
        updateModalGallery(allWorks); // Mettre à jour la galerie modale
    } else {
        await fetchDataAndUpdateGalleries();
    }
}

// Appeler la fonction pour récupérer et mettre à jour les données lors du chargement de la page
document.addEventListener('DOMContentLoaded', async () => {
    await retrieveDataAndUpdateGalleries();
});
