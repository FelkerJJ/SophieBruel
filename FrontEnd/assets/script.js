async function getData() {
    try {
        const response = await fetch('http://localhost:5678/api/works', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        throw error; 
    }
}

// Fonction pour gérer le clic sur les boutons de filtre
async function handleFilterClick(event) {
    const categoryID = event.target.dataset.categoryId; 
    if (categoryID === "all") {
        const allWorks = await getData();
        updateGallery(allWorks);
    } else {
        try {
            const filteredWorks = await filterdata(categoryID);
            updateGallery(filteredWorks);
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la galerie:", error);
        }
    }
}

// Mise à jour de la galerie avec les données filtrées
function updateGallery(filteredWorks) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = ''; // Efface les images précédentes de la galerie
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

// Récupération des données et configuration des écouteurs d'événements pour les boutons de filtre
getData().then(data => {
    try {
        const filterButtons = document.querySelectorAll(".filters-button button");
        filterButtons.forEach(button => {
            button.addEventListener('click', handleFilterClick);
        });
    } catch (error) {
        console.error("Erreur lors de l'accès aux données:", error);
    }
});

// Fonction pour filtrer les données en fonction de la catégorie sélectionnée
async function filterdata(categoryID) {
    const works = await getData();
    return works.filter(work => work.categoryId == categoryID);
}
