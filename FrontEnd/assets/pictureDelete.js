// Fonction asynchrone pour supprimer un élément
async function deleteItem(itemId, figureElement) {
    const API_URL = `http://localhost:5678/api/works/${itemId}`;
    const userData = getSession();

    if (!userData || !userData.token) {
        console.error('Token not found. User might not be logged in.');
        return;
    }

    // Récupérer le token d'authentification de l'utilisateur
    const token = userData.token;

    try {
        const response = await fetch(API_URL, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erreur lors de la suppression de l\'élément.');
        }

        // Supprime l'élément de figure du DOM après la suppression réussie
        figureElement.remove();

        // Filtrer l'élément supprimé de la liste allWorks
        allWorks = allWorks.filter(work => work.id !== itemId);
    } catch (error) {
        console.error('Erreur:', error);
    }
}

// Fonction pour attacher les écouteurs d'événements aux icônes trash
function attachDeleteListeners() {

    // Sélectionner toutes les icônes de corbeille dans le DOM
    document.querySelectorAll('.fa-trash-can').forEach(icon => {
        icon.addEventListener('click', async function() {
            // Récupérer l'ID de l'élément associé à partir de l'attribut data-itemId
            const itemId = this.dataset.itemId;
            // Trouver l'élément figure parent correspondant à partir de l'icône
            const figureElement = this.closest('.image-container');
            // Appeler la fonction deleteItem pour supprimer l'élément associé
            await deleteItem(itemId, figureElement);
        });
    });
}

// Appel de la fonction pour attacher les écouteurs d'événements après le chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    attachDeleteListeners();
});
