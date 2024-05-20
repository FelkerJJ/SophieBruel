// Événement au clic sur le bouton principal
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



// Ajouter un gestionnaire d'événements au clic pour masquer l'icône de la flèche gauche
arrowLeftIcon.addEventListener("click", function() {
    document.getElementById("modalTitle1").textContent = "Galerie photo";
    document.querySelector(".modal-gallery").style.display = "grid";
    document.getElementById("addPhotoForm").style.display = "none";
    document.getElementById("pictureBloc").style.display = "none";
    customCTAButton.textContent = "Ajouter une photo"; 
    customCTAButton.style.display = "block"; 
    customCTAButton.classList.remove("elementCTA", "elementLign"); 
    document.querySelector(".ligne-modal").classList.remove("elementLign");
    document.querySelector(".ligne-modal").classList.add("ligne-modalreturn"); 
});



// Modifs ajoutées par le bouton "Ajouter une photo"
const customCTAButton = document.getElementById("addPhotoButton");
customCTAButton.addEventListener("click", function() {
    customCTAButton.textContent = "Valider"; 
    customCTAButton.classList.add("elementCTA"); 
    customCTAButton.classList.add("elementLign"); 
    document.querySelector(".ligne-modal").classList.add("elementLign");
});
