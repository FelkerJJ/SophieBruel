// Variables globales pour stocker les données
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
    updateMainGallery(filteredWorks); 
    updateModalGallery(filteredWorks); 
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
        const figure = document.createElement('figure'); // Créer un élément figure
        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;
        figure.appendChild(img);
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;
        figure.appendChild(figcaption);
        gallery.appendChild(img);
    });
}

// Récupère les données lors du chargement de la page et met à jour les galeries
async function fetchDataAndUpdateGalleries() {
    try {
        const data = await getData(); 
        allWorks = data; 
        updateMainGallery(allWorks); 
        updateModalGallery(allWorks);
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
        updateMainGallery(allWorks); 
        updateModalGallery(allWorks);
    } else {
        await fetchDataAndUpdateGalleries();
    }

    // Ajout des écouteurs d'événements pour les boutons de filtre
    const filterButtons = document.querySelectorAll('.filters-button button');
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });
}

// Appeler la fonction pour récupérer et mettre à jour les données lors du chargement de la page
document.addEventListener('DOMContentLoaded', async () => {
    await retrieveDataAndUpdateGalleries();
});

// Fonction pour ajouter une nouvelle œuvre à la galerie
function addNewWork(work) {
    allWorks.push(work); // Ajouter la nouvelle œuvre à la liste
    updateMainGallery(allWorks); // Mettre à jour la galerie principale
    updateModalGallery(allWorks); // Mettre à jour la galerie modale
}

// Fonction pour télécharger une nouvelle image
async function uploadNewImage(formData) {
    try {
        const response = await fetch('http://localhost:5678/api/upload', {
            method: "POST",
            body: formData,
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur lors du téléchargement de l\'image:', error);
        throw error; // Gérer l'erreur de manière appropriée dans votre application
    }
}

// Gestionnaire d'événements pour soumettre le formulaire d'ajout d'image
async function handleImageUpload(event) {
    event.preventDefault(); // Empêcher le comportement par défaut du formulaire

    // Récupérer les données du formulaire d'ajout d'image
    const formData = new FormData(event.target);
    
    try {
        // Télécharger la nouvelle image
        const imageData = await uploadNewImage(formData);
        
        // Ajouter la nouvelle image à la galerie
        addNewWork(imageData);
        
        // Effacer le formulaire après l'ajout de l'image
        event.target.reset();
    } catch (error) {
        console.error('Erreur lors du traitement de l\'image:', error);
        // Gérer l'erreur de manière appropriée dans votre application
    }
}
// Mettre à jour à la fois la galerie principale et la galerie modale avec les images et les informations
function updateGalleries(filteredWorks) {
    const mainGallery = document.querySelector('.gallery');
    const modalGallery = document.querySelector('.modal-gallery');
    
    // Effacer le contenu des deux galeries
    mainGallery.innerHTML = '';
    modalGallery.innerHTML = '';

    filteredWorks.forEach(work => {
        // Créer un élément figure pour chaque œuvre
        const figure = document.createElement('figure');

        // Créer une image
        const img = document.createElement('img');
        img.src = work.imageUrl;
        img.alt = work.title;

        // Créer une légende pour l'image
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;

        // Ajouter l'image et la légende à la figure
        figure.appendChild(img);
        figure.appendChild(figcaption);

        // Ajouter la figure à la galerie principale
        mainGallery.appendChild(figure.cloneNode(true));

        // Ajouter uniquement l'image à la galerie modale
        modalGallery.appendChild(img.cloneNode(true));
    });
}
