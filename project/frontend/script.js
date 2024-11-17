const apiBaseUrl = 'http://localhost:3000';

function login() {
    const id = document.getElementById('login-id').value.trim();
    const password = document.getElementById('login-password').value.trim();

    fetch(`${apiBaseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
    })
    .then((res) => res.json())
    .then((data) => {
        alert(data.message);
        if (data.isAdmin) {
            document.querySelector('.admin-button').classList.remove('hidden');
        }
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('quiz-section').classList.remove('hidden');
    })
    .catch((err) => {
        alert(err.message);
    });
}

function openAdmin() {
    fetch(`${apiBaseUrl}/credentials`)
        .then((res) => res.json())
        .then((data) => {
            const list = data.map((cred) => `<li>${cred.id} - Used: ${cred.used}</li>`).join('');
            document.getElementById('admin-credentials').innerHTML = `<ul>${list}</ul>`;
            document.getElementById('admin-section').classList.remove('hidden');
        });
}

function resetCredentials() {
    fetch(`${apiBaseUrl}/reset-credentials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 'admin911', password: '44505' }),
    })
    .then((res) => res.json())
    .then((data) => alert(data.message));
}

function closeAdmin() {
    document.getElementById('admin-section').classList.add('hidden');
}
