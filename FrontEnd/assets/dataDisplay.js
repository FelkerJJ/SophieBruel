// Variable vide pour stocker les données
let allWorks = []; 

// Effectue une requête "Get" pour récupérer les données de l'API 
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

// Fonction de gestionnaire d'événement pour le clic sur les filtres
async function handleFilterClick(event) {
    const categoryID = event.target.dataset.categoryId;
    const filteredWorks = (categoryID === "all") ? allWorks : allWorks.filter(work => work.categoryId == categoryID);
    updateGallery(filteredWorks);
}

// Mettre à jour la galerie avec les nouveaux ajouts
function updateGallery(filteredWorks) {
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

// Récupère les données lors du chargement de la page et met à jour la galerie
getData().then(data => {
    allWorks = data; 
    updateGallery(allWorks);
});

// Add un gestionnaire d'événement pour les bouton de filtre pour déclencher la fonction handleFilterClick
document.querySelectorAll(".filters-button button").forEach(button => {
    button.addEventListener('click', handleFilterClick);
});