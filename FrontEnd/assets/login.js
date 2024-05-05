async function login(email, password) {
  const API_URL = "http://localhost:5678/api/users/login";

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const userData = await response.json();
      saveSession(userData);
    }
    
    return response.ok;
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    throw error;
  }
}

function saveSession(userData) {
  localStorage.setItem('loggedInUser', JSON.stringify(userData));
}

function checkLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  login(email, password)
  .then((success) => {
    if (success) {
      document.getElementById('loginButton').innerText = 'logout';
      document.getElementById('modeEdition').style.display = 'block';
      //window.location.href = 'index.html';//
    } else {
      alert('Erreur dans l’identifiant ou le mot de passe');
    }
  })
  .catch((error) => {
    console.error("Erreur lors de la vérification de la connexion:", error);
  });

console.log(checkLogin);
}
