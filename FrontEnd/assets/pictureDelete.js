async function deleteItem(itemId, figureElement) {
    const API_URL = `http://localhost:5678/api/works/${itemId}`;
    const userData = getSession();

    if (!userData || !userData.token) {
        console.error('Token not found. User might not be logged in.');
        return;
    }

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

        figureElement.remove();

        allWorks = allWorks.filter(work => work.id !== itemId);
    } catch (error) {
        console.error('Erreur:', error);
    }
}

// Fonction pour attacher les écouteurs d'événements aux icônes trash
function attachDeleteListeners() {
    document.querySelectorAll('.fa-trash-can').forEach(icon => {
        icon.addEventListener('click', async function() {
            console.log('Icon clicked:', this);
            const itemId = this.dataset.itemId;
            const figureElement = this.closest('.image-container');
            await deleteItem(itemId, figureElement);
        });
    });
}

// Appel de la fonction pour attacher les écouteurs d'événements après le chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    attachDeleteListeners();
});
