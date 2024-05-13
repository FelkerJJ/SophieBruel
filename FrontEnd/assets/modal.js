// Récupérer la modale
const modal = document.getElementById("myModal");

// Récupérer le bouton "modifier"
const modifierBtn = document.querySelector(".modifier-text");

// Récupérer l'élément span pour fermer la modale
const span = document.querySelector(".close");

// Quand l'utilisateur clique sur "modifier", afficher la modale
modifierBtn.onclick = function() {
  modal.style.display = "block";
}

// Quand l'utilisateur clique sur <span> (x), fermer la modale
span.onclick = function() {
  modal.style.display = "none";
}

// Quand l'utilisateur clique en dehors de la modale, la fermer
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
