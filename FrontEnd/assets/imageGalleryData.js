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
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}

// Mettre à jour la modale avec toutes les informations
function updateModalGallery(filteredWorks) {
    const gallery = document.querySelector('.modal-gallery');
    gallery.innerHTML = ''; 

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



