// Récupérer la modale avec les éléments
const modal = document.getElementById("myModal");
const modifierBtn = document.querySelector(".modifier-text");
const closeSpan = document.querySelector(".close");

// Masque l'icone arrow sur la première page modal "Galerie photo"
arrowLeftIcon.style.display = "none";

// Ajoute un gestionnaire d'événement pour le bouton "modifier"
modifierBtn.onclick = function() {
  modal.style.display = "block";
}

// Ajoute un gestionnaire d'événement sur le bouton (x) => (redirection page "Galerie Photo" + fermer la modale)
closeSpan.onclick = function() {
  resetToGallery();
  modal.style.display = "none";
}

// Si l'utilisateur clique en dehors de la modal => (redirection page "Galerie Photo" + fermer la modale)
window.onclick = function(event) {
  if (event.target == modal) {
    resetToGallery();
    modal.style.display = "none";
  }
}

