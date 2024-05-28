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
    updateMainGallery(filteredWorks); // Mettre à jour la galerie principale
    updateModalGallery(filteredWorks); // Mettre à jour la galerie modale avec les mêmes données filtrées
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

function updateModalGallery(filteredWorks) {
    const gallery = document.querySelector('.modal-gallery');
    gallery.innerHTML = ''; // Vide la galerie existante

    filteredWorks.forEach(work => {
        const container = document.createElement('div');
        container.className = 'image-container';

        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title || 'Image';

        const trashIcon = document.createElement('i');
        trashIcon.className = 'fa-solid fa-trash-can';
        trashIcon.dataset.itemId = work.id;

        container.appendChild(img);
        container.appendChild(trashIcon);
        gallery.appendChild(container);
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

    // Ajout des écouteurs d'événements pour les boutons de filtre
    const filterButtons = document.querySelectorAll('.filters-button button');
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });
}

// Attendre que le contenu du document soit chargé
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('photoUploadForm');
    const photoInput = document.getElementById('photoInput');
    const titleInput = document.getElementById('titre');
    const categorySelect = document.getElementById('categorie');
    const addPhotoButton = document.getElementById('addPhotoButton');

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

    // Ajouter des écouteurs d'événements pour vérifier la validité du formulaire
    photoInput.addEventListener('change', checkFormValidity);
    titleInput.addEventListener('input', checkFormValidity);
    categorySelect.addEventListener('change', checkFormValidity);
});

import { retrieveDataAndUpdateGalleries } from './apiFunctions.js';