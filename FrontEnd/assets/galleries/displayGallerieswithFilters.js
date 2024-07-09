// Variables globales pour stocker les données récupérées depuis l'API
let allWorks = [];

// Function pour récupérer les données depuis l'API ==> /works (Return all works)
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

// Function pour mettre à jour les galeries d'images avec les filtres demandés
function updateGalleries(filteredWorks) {
    const mainGallery = document.querySelector('.gallery');
    const modalGallery = document.querySelector('.modal-gallery');

    mainGallery.innerHTML = '';
    modalGallery.innerHTML = '';

    filteredWorks.forEach(work => {
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

// Function pour récupérer les données depuis l'API et les mettre à jour
async function fetchDataAndUpdateGalleries() {
    try {
        const data = await getData();
        allWorks = data;
        updateGalleries(allWorks);

        // Collecte des catégories uniques à partir des données
        const uniqueCategories = new Set();
        allWorks.forEach(work => uniqueCategories.add(work.categoryId));

        // Sélectionne l'élément pour les boutons de filtre
        const filtersList = document.querySelector('.filters-list');

        // Nettoyer les anciennes catégories avant d'ajouter de nouvelles
        filtersList.innerHTML = '';

        // Ajouter le bouton "Tous" s'il n'existe pas encore
        if (!filtersList.querySelector('[data-category-id="all"]')) {
            const allButton = document.createElement('button');
            allButton.classList.add('category-button');
            allButton.textContent = 'Tous';
            allButton.dataset.categoryId = 'all';
            const listItem = document.createElement('li');
            listItem.appendChild(allButton);
            filtersList.appendChild(listItem);
        }

        // Ajouter les catégories filtrées aux boutons de filtre
        uniqueCategories.forEach(categoryId => {
            const button = document.createElement('button');
            button.classList.add('category-button');
            button.textContent = getCategoryName(categoryId);
            button.dataset.categoryId = categoryId;
            const listItem = document.createElement('li');
            
            listItem.appendChild(button);
            filtersList.appendChild(listItem);
        });

        // Ajoute les écouteurs d'événements aux nouveaux boutons
        const filterButtons = document.querySelectorAll('.category-button');
        filterButtons.forEach(button => {
            button.addEventListener('click', handleFilterClick);
        });

    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

function getCategoryName(categoryId) {
    switch (categoryId) {
        case 1:
            return "Objets";
        case 3:
            return "Appartements"; 
        case 2:
            return "Hotels & restaurants";
        default:
            return "Inconnu";
    }
}

// Gestionnaire d'événements pour les filtres des catégories
async function handleFilterClick(event) {
    const categoryId = event.target.dataset.categoryId;
    const filteredWorks = (categoryId === "all") ? allWorks : allWorks.filter(work => work.categoryId == categoryId);
    updateGalleries(filteredWorks);
}

// Function pour récupérer les données et mettre à jour les galeries au chargement de la page
async function retrieveDataAndUpdateGalleries() {
    await fetchDataAndUpdateGalleries();
    const filterButtons = document.querySelectorAll('.filters-button button');
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });
}

// Au chargement de la page, récupère les données et met à jour les galeries
document.addEventListener('DOMContentLoaded', retrieveDataAndUpdateGalleries);
