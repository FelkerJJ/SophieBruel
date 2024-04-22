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

function handleFilterClick(event) {
    const categoryID = event.target.dataset.categoryId; 
    GalleryCategory(categoryID); 
}

function GalleryCategory(categoryID) {
    filterdata(categoryID);
    const galleryItems = document.querySelectorAll('.gallery figure');
    galleryItems.forEach(item => {
        const shouldDisplay = (item.classList.contains(categoryID) || categoryID);
        item.style.display = shouldDisplay ? 'block' : 'none';
    });
}

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

function filterdata(categoryID) {
    getData().then(works => {
        works.forEach(work => {
            if (work.categoryId == categoryID) {
                console.log(work.imageUrl)
                console.log(work.title)
            }
        })
    })
}