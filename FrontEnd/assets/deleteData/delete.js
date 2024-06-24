async function deleteImage(imageId) {
    const token = getSession();
    if (!token) {
        console.error('User not logged in');
        return;
    }

    try {
        const response = await fetch(`http://localhost:5678/api/works/${imageId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete image');
        }

        // Supprimer l'image de l'interface utilisateur
        const imageContainerToDelete = document.querySelector(`#modalGallery .image-container [data-itemId="${imageId}"]`);
        if (imageContainerToDelete) {
            imageContainerToDelete.parentElement.removeChild(imageContainerToDelete);
        } else {
            console.error('Image container not found in modal gallery');
        }

        console.log('Image deleted successfully');
    } catch (error) {
        console.error('Error deleting image:', error);
    }
}
