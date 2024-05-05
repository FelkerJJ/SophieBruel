let allWorks = []; // Variable globale pour stocker toutes les œuvres

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

async function handleFilterClick(event) {
    const categoryID = event.target.dataset.categoryId;
    const filteredWorks = (categoryID === "all") ? allWorks : allWorks.filter(work => work.categoryId == categoryID);
    updateGallery(filteredWorks);
}

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

getData().then(data => {
    allWorks = data; 
    updateGallery(allWorks);
});

document.querySelectorAll(".filters-button button").forEach(button => {
    button.addEventListener('click', handleFilterClick);
});