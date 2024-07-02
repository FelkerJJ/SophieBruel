// Fonction pour supprimer une image
async function deleteImage(workId) {
    const token = getSession();

    if (!token) {
        console.error('User not logged in');
        return;
    }

    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        // Supprimer l'image de la modale
        const imageContainer = document.querySelector(`[data-item-id="${workId}"]`);
        if (imageContainer) {
            imageContainer.parentElement.removeChild(imageContainer);
        } else {
            console.error('Image container not found in modal');
        }

        // Mettre à jour les galeries pour refléter la suppression
        await fetchDataAndUpdateGalleries();
    } else {
        console.error('Failed to delete image');
    }
}

// Gestionnaire d'événements pour soumettre le formulaire d'ajout d'image
async function handleImageUpload(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    try {
        const imageData = await uploadNewImage(formData);
        addNewWork(imageData);
        event.target.reset();
    } catch (error) {
        console.error('Erreur lors du traitement de l\'image:', error);
    }
}

// Appel initial pour récupérer les données et mettre à jour les galeries au chargement de la page
document.addEventListener('DOMContentLoaded', async () => {
    await retrieveDataAndUpdateGalleries();
});
