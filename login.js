const users = JSON.parse(localStorage.getItem('users')) || [];

const bloodTypes = {
    "A+": "Características do tipo A+.",
    "A-": "Características do tipo A-.",
    "B+": "Características do tipo B+.",
    "B-": "Características do tipo B-.",
    "AB+": "Características do tipo AB+.",
    "AB-": "Características do tipo AB-.",
    "O+": "Características do tipo O+.",
    "O-": "Características do tipo O-."
};

const MIN_LENGTH = 5;

function showRegisterForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

function showLoginForm() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

function register() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const bloodType = document.getElementById('blood-type').value;

    if (username.length < MIN_LENGTH || password.length < MIN_LENGTH) {
        alert(`O nome de usuário e a senha devem ter pelo menos ${MIN_LENGTH} caracteres.`);
        return;
    }

    if (users.some(user => user.username === username)) {
        alert('Usuário já existe!');
        return;
    }

    users.push({ username, password, bloodType });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registrado com sucesso!');
    showLoginForm();
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username.length < MIN_LENGTH || password.length < MIN_LENGTH) {
        alert(`O nome de usuário e a senha devem ter pelo menos ${MIN_LENGTH} caracteres.`);
        return;
    }

    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        alert('Usuário ou senha incorretos!');
        return;
    }

    localStorage.setItem('loggedInUser', JSON.stringify(user));
    window.location.href = 'profile.html'; // Redireciona para a página de perfil após login
}

function showProfile(user) {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('profile').style.display = 'block';

    document.getElementById('welcome-message').innerText = `Bem-vindo, ${user.username}!`;
    document.getElementById('blood-type-description').innerText = `Seu tipo sanguíneo é ${user.bloodType}: ${bloodTypes[user.bloodType]}`;
}

function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'login.html'; // Redireciona para a página de login
}

window.onload = function() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        window.location.href = 'profile.html'; // Redireciona para a página de perfil se o usuário estiver logado
    }
};
