const isSomeoneLoggedIn = getSession();

if(isSomeoneLoggedIn) {
  const loginLink = document.getElementById("login-link");

  if(loginLink) {
    document.getElementById('login-link').innerText = 'logout';
    document.getElementById('login-link').id = 'logout-link';
    document.getElementById('modeEdition').style.display = 'block';
  }
  
}

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
    
    return await response.json();

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
  .then((response) => {
    if (response) {
      saveSession(response);
      window.location.href = 'index.html';
    } else {
      alert('Erreur dans l’identifiant ou le mot de passe');
    }
  })
  .catch((error) => {
    console.error("Erreur lors de la vérification de la connexion:", error);
  });

}

function getSession(userData) {
  return localStorage.getItem('loggedInUser');
}

const logoutLink = document.getElementById("logout-link");

if(logoutLink) {
  document.getElementById('logout-link').addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.clear();
    window.location.href = 'login.html';
  });
}