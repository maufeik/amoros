const gruposSanguineos = [
    "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"
];
const selectGrupoSangre = document.getElementById('profileGrupSang');
const profileForm = document.querySelector('#profileForm');

const user = JSON.parse(localStorage.getItem('login_success')) || false;
if (!user) {
    window.location.href = 'login.html';
}

document.querySelector('#aboutme').addEventListener('click', () => { window.location.href = 'aboutme.html'; });
document.querySelector('#myprofile').addEventListener('click', () => { window.location.href = 'myprofile.html'; });
document.querySelector('#mytreatments').addEventListener('click', () => { window.location.href = 'mytreatments.html'; });
document.querySelector('#logout').addEventListener('click', () => {
    alert('Hasta pronto!');
    localStorage.removeItem('login_success');
    window.location.href = 'login.html';
});

function crearOpcionesGrupoSanguineo(currentGroup) {
    selectGrupoSangre.innerHTML = '';
    gruposSanguineos.forEach(grupo => {
        const option = document.createElement('option');
        option.value = grupo;
        option.textContent = grupo;
        if (grupo === currentGroup) {
            option.selected = true;
        }
        selectGrupoSangre.appendChild(option);
    });
}

function loadUserProfile() {
    if (user) {
        document.querySelector('#profileName').value = user.name;
        document.querySelector('#profileEmail').value = user.email;
        document.querySelector('#profilePassword').value = user.password;
        document.querySelector('#profileBornDate').value = user.bornDate; 
        
        crearOpcionesGrupoSanguineo(user.grupSang);
    }
}

loadUserProfile();


profileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newName = document.querySelector('#profileName').value;
    const newPassword = document.querySelector('#profilePassword').value;
    const newBornDate = document.querySelector('#profileBornDate').value;
    const newGrupSang = document.querySelector('#profileGrupSang').value;
    const userEmail = user.email; 

    if (!newName || !newPassword || !newBornDate || !newGrupSang) {
        return alert('Por favor, completa todos los campos requeridos.');
    }

    let allUsers = JSON.parse(localStorage.getItem('users')) || [];
    let userIndex = allUsers.findIndex(u => u.email === userEmail);

    if (userIndex !== -1) {

        allUsers[userIndex].name = newName;
        allUsers[userIndex].password = newPassword;
        allUsers[userIndex].bornDate = newBornDate;
        allUsers[userIndex].grupSang = newGrupSang;

        localStorage.setItem('users', JSON.stringify(allUsers));

        localStorage.setItem('login_success', JSON.stringify(allUsers[userIndex]));

        alert('¡Perfil actualizado exitosamente!');
    } else {
        alert('Error: No se encontró el usuario para actualizar.');
    }
});