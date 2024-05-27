// Appel de la fonction pour attacher les écouteurs d'événements après le chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    attachDeleteListeners();
});

function attachDeleteListeners() {
    // Code pour attacher les écouteurs d'événements aux icônes trash
    // Par exemple :
    const trashIcons = document.querySelectorAll('.fa-trash-can');
    trashIcons.forEach(trashIcon => {
        trashIcon.addEventListener('click', (event) => {
            const itemId = event.target.dataset.itemId;
            const figureElement = event.target.parentNode; // Suppose que l'icône est enfant d'une balise figure
            deleteItem(itemId, figureElement);
        });
    });
}


// Fonction asynchrone pour supprimer un élément
async function deleteItem(itemId, figureElement) {
    // Supprimer l'élément de figure du DOM après la suppression réussie
    if (figureElement) {
        figureElement.remove();
    }

    // Filtrer l'élément supprimé de la liste allWorks
    allWorks = allWorks.filter(work => work.id !== itemId);

    // Mettre à jour la galerie principale
    updateGallery('.gallery', allWorks);

    // Mettre à jour les données stockées localement après la suppression réussie
    localStorage.setItem('allWorks', JSON.stringify(allWorks));
}

// Mettre à jour la galerie avec les nouveaux éléments
function updateGallery(selector, filteredWorks) {
    const gallery = document.querySelector(selector);
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
        
        // Ajouter l'icône de corbeille
        const trashIcon = document.createElement('i');
        trashIcon.classList.add('fa-solid', 'fa-trash-can');
        trashIcon.dataset.itemId = work.id; // Utiliser l'ID de l'élément
        figure.appendChild(trashIcon);
        
        gallery.appendChild(figure);
    });

    // Attacher les écouteurs d'événements aux icônes trash
    attachDeleteListeners();
}