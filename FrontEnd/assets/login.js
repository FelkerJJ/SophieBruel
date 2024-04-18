function checkLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email === 'sophie.bluel@test.tld' && password === 'S0phie') {
    document.getElementById('loginButton').innerText = 'logout'; 
    window.location.href = 'index.html';
  } else {
    document.getElementById('loginButton').innerText = 'login'; 
    alert('Erreur dans l’identifiant ou le mot de passe');
  }
}

function storeToken(token) {
  localStorage.setItem('authToken', token);
}

function getToken() {
  return localStorage.getItem('authToken');
}

// function updateLoginButton() {
//   const token = getToken();
//   const loginButton = document.getElementById('loginButton');
//   if (token) { 
//     loginButton.innerText = 'logout';
//   } else {
//     loginButton.innerText = 'login';
//   }
// }