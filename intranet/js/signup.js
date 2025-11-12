const gruposSanguineos = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-"
];

const selectGrupoSangre = document.getElementById('grupSang');

function crearOpcionesGrupoSanguineo() {
    const defaultOption = document.createElement('option');
    defaultOption.value = "...";
    defaultOption.textContent = "-- Selecciona --";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    selectGrupoSangre.appendChild(defaultOption);

    gruposSanguineos.forEach(grupo => {
        const option = document.createElement('option');
        option.value = grupo;
        option.textContent = grupo;
        selectGrupoSangre.appendChild(option);
    });
}

crearOpcionesGrupoSanguineo();

const signupForm = document.querySelector('#signupForm')
signupForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const name = document.querySelector('#name').value
    const email = document.querySelector('#email').value
    const password = document.querySelector('#password').value
    const bornDate = document.querySelector('#bornDate').value
    const grupSang = document.querySelector('#grupSang').value

    
    const Users = JSON.parse(localStorage.getItem('users')) || []
    const isUserRegistered = Users.find(user => user.email === email)
    if(isUserRegistered){
        return alert('El usuario ya esta registado!')
    }

    Users.push({name: name, email: email, password: password, bornDate: bornDate, grupSang:grupSang})
    localStorage.setItem('users', JSON.stringify(Users))
    alert('Registro Exitoso!')
    window.location.href = 'login.html'

})