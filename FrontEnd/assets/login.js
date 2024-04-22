async function login(url = "", data = {}) 
{
  const response = await fetch(url, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

    return response.json();
}

function checkLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

login("http://localhost:5678/api/users/login", { email: email, password: password }).then((data) => {
  console.log(data); 
  });

  if (email === 'sophie.bluel@test.tld' && password === 'S0phie') {
    document.getElementById('loginButton').innerText = 'logout'; 
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
