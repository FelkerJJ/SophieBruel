// Gestionnaire d'événement pour le premier bouton "Ajouter une photo"
document.getElementById("addPhotoButton").addEventListener("click", function() {
    document.getElementById("modalTitle1").textContent = "Ajout photo";
    document.querySelector(".modal-gallery").style.display = "none";
    document.getElementById("addPhotoForm").style.display = "block";
    document.getElementById("pictureBloc").style.display = "block";
    document.getElementById("previousButtonModal2").classList.remove("hidden");
    document.querySelector(".mainContainer").style.bottom = "22px";
    document.querySelector(".mainContainer").style.position = "relative";
    document.querySelector(".close").style.top = "0px";
    arrowLeftIcon.style.display = "block"; 
});


// Modifs ajoutées sur le bouton "Valider"
const customCTAButton = document.getElementById("addPhotoButton");
customCTAButton.addEventListener("click", function() {
    customCTAButton.textContent = "Valider"; 
    customCTAButton.classList.add("elementCTA"); 
    customCTAButton.classList.add("elementLign"); 
    document.querySelector(".ligne-modal").classList.add("elementLign");
});

// Gestionnaire d'événement pour le retour "Galerie Photo" via ArrowLeft
function resetToGallery() {
    document.getElementById("modalTitle1").textContent = "Galerie photo";
    document.querySelector(".modal-gallery").style.display = "grid";
    document.getElementById("addPhotoForm").style.display = "none";
    document.getElementById("pictureBloc").style.display = "none";
    customCTAButton.textContent = "Ajouter une photo"; 
    customCTAButton.style.display = "block"; 
    customCTAButton.classList.remove("elementCTA", "elementLign"); 
    document.querySelector(".ligne-modal").classList.remove("elementLign");
    document.querySelector(".ligne-modal").classList.add("ligne-modalreturn"); 
    document.querySelector(".mainContainer").style.bottom = "0px";
    document.querySelector(".close").style.top = "24px";
    arrowLeftIcon.style.display = "none";
}

// Gestionnaire d'événement pour le reset "Galerie Photo" via ArrowLeft
arrowLeftIcon.addEventListener("click", resetToGallery);


// Gestionnaire d'événement pour ajouter une image sur le front
document.getElementById("photoInput").addEventListener("change", function(event) {
    const file = event.target.files[0]; 
    
    if (file) { 
        const reader = new FileReader(); 
        
        reader.onload = function(e) { 
            const imageUrl = e.target.result; 
            afficherImage(imageUrl); 
        };
        
        reader.readAsDataURL(file); 
    }
});

// Fonction pour afficher l'image sur le front-end
function afficherImage(imageUrl) {
    const imageElement = document.createElement("img"); 
    imageElement.src = imageUrl; 
    
    const imageContainer = document.getElementById("imageContainer"); 
    imageContainer.innerHTML = ""; 
    imageContainer.appendChild(imageElement); 

    // Masquer les éléments spécifiés
    document.getElementById("addPictureLabel").style.display = "none";
    document.getElementById("textinfoJs").style.display = "none";
    document.getElementById("IconJs").style.display = "none";

}

