// Événement au clic sur le bouton principal
document.getElementById("addPhotoButton").addEventListener("click", function() {
    document.getElementById("modalTitle1").textContent = "Ajout photo";
    document.querySelector(".modal-gallery").style.display = "none";
    document.getElementById("addPhotoForm").style.display = "block";
    document.getElementById("pictureBloc").style.display = "block";
    document.getElementById("previousButtonModal2").classList.remove("hidden");
});

    
// Modifs ajoutés by le bouton "Ajouter une photo"
const customCTAButton = document.getElementById("addPhotoButton");
    customCTAButton.addEventListener("click", function() {
        customCTAButton.textContent = "Valider"; 
        customCTAButton.classList.add("elementCTA"); 
        customCTAButton.classList.add("elementLign"); 
        document.querySelector(".ligne-modal").classList.add("elementLign");
});
