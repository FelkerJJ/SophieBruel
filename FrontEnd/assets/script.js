// Constantes pour les classes de filtre
const FILTER_CLASSES = {
    ALL: 'all',
    WORKS: 'works',
    CATEGORIES: 'categories',
    APPARTMENTS: 'appartments'
};

// Fonction pour récupérer les données depuis l'API
async function getData() {
    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json(); // Convertit la réponse en JSON
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        throw error; // Propage l'erreur pour la gérer ailleurs si nécessaire
    }
}

// Fonction pour mettre à jour l'affichage en fonction du filtre
function updateGallery(filterClass) {
    const galleryItems = document.querySelectorAll('.gallery figure'); // Sélectionne tous les éléments de la galerie
    galleryItems.forEach(item => {
        // Vérifie si l'élément doit être affiché en fonction du filtre sélectionné
        const shouldDisplay = (item.classList.contains(filterClass) || filterClass === FILTER_CLASSES.ALL);
        // Modifie le style d'affichage de l'élément en conséquence
        item.style.display = shouldDisplay ? 'block' : 'none';
    });
}

// Fonction pour gérer le clic sur les boutons de filtre
function handleFilterClick(event) {
    const filterClass = event.target.dataset.categoryId; 
    updateGallery(filterClass); 
}

// Initialisation : récupérer les données et ajouter les écouteurs d'événements
getData().then(data => {
    try {
        console.log(data); // Afficher les données récupérées dans la console

        const filterButtons = document.querySelectorAll(".filters-button button");
        // Ajoute un écouteur d'événements de clic à chaque bouton de filtre
        filterButtons.forEach(button => {
            button.addEventListener('click', handleFilterClick);
        });
    } catch (error) {
        console.error("Erreur lors de l'accès aux données:", error);
    }
});
