const user = JSON.parse(localStorage.getItem('login_success')) || false
if(!user){
    window.location.href = 'login.html'
}

document.querySelector('#home').addEventListener('click',() => {window.location.href = 'index.html'});
const logout = document.querySelector('#logout')
const aboutme = document.querySelector('#aboutme')
const myprofile = document.querySelector('#myprofile')
const mytreatments = document.querySelector('#mytreatments')

aboutme.addEventListener('click', ()=>{
    window.location.href = 'aboutme.html'
})

myprofile.addEventListener('click', ()=>{
    window.location.href = 'myprofile.html'
})

mytreatments.addEventListener('click', ()=>{
    window.location.href = 'mytreatments.html'
})


logout.addEventListener('click', ()=>{
    alert('Hasta pronto!')
    localStorage.removeItem('login_success')
    window.location.href = 'login.html'
})