// Function async pour supprimer une image
async function deleteImage(workId) {

    // Fait appel à la function getSession (formDatawith Galleries.JS) pour récup le token
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
        if (imageContainer) {
        } else {
            console.error('Image container not found in modal');
        }

        // Fait appel à la function fetchData... (displayGallerieswithFilters) pour update les galeries après la suppression
        await fetchDataAndUpdateGalleries();
    } else {
        console.error('Failed to delete image');
    }
}

// Appel initial pour récupérer les données et mettre à jour les galeries à la fin du chargement du DOM
document.addEventListener('DOMContentLoaded', async () => {
    await retrieveDataAndUpdateGalleries();
});
