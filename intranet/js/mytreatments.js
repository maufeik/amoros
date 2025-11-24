const user = JSON.parse(localStorage.getItem('login_success')) || false
if(!user){
    window.location.href = 'login.html'
}

class Treatment{
    constructor(idTr, idPac, name, date){
        this.idTr=idTr;
        this.idPac=idPac;
        this.name=name;
        this.date=date;           
    }
}
document.querySelector('#home').addEventListener('click',() => {window.location.href = 'index.html'});
document.querySelector('#aboutme').addEventListener('click', () => { window.location.href = 'aboutme.html'; });
document.querySelector('#myprofile').addEventListener('click', () => { window.location.href = 'myprofile.html'; });
document.querySelector('#mytreatments').addEventListener('click', () => { window.location.href = 'mytreatments.html'; });
document.querySelector('#logout').addEventListener('click', () => {
    alert('Hasta pronto!');
    localStorage.removeItem('login_success');
    window.location.href = 'login.html';
});

class UI{
    static displayTreatments(){
        const treatments = Store.getTreatments();
        treatments.forEach((treatment)=> UI.addTreatmentToList(treatment));
    }
    static addTreatmentToList(treatment){
        const list = document.querySelector("#treatment-list");
        const row = document.createElement("tr");

        row.innerHTML = `
         <td>${treatment.idTr}</td>
         <td>${treatment.idPac}</td>
         <td>${treatment.name}</td>
         <td>${treatment.date}</td>    
         <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static clearFields(){
        document.querySelector('#idTr').value = '';
        document.querySelector('#idPac').value = '';
        document.querySelector('#name').value = '';
        document.querySelector('#date').value = '';
    }

    static deleteTreatment(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
}

class Store{
    static getTreatments(){
        let treatments;
        if(localStorage.getItem('treatments')===null){
            treatments =[]
        }else{
            treatments = JSON.parse(localStorage.getItem('treatments'));
        }
        return treatments;
    } 

    static addTreatment(treatment){
        const treatments = Store.getTreatments();
        treatments.push(treatment);
        localStorage.setItem('treatments', JSON.stringify(treatments));
    }

    static removeTreatment(idTr){
        const treatments = Store.getTreatments();
        treatments.forEach((treatment, index) => {
            if(treatment.idTr === idTr){
                treatments.splice(index, 1);
            }
        });
        localStorage.setItem('treatments', JSON.stringify(treatments));
    }
}

document.addEventListener("DOMContentLoaded", UI.displayTreatments);

document.querySelector("#treatment-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const idTr = document.querySelector("#idTr").value;
    const idPac = document.querySelector("#idPac").value;
    const name = document.querySelector("#name").value;
    const date = document.querySelector("#date").value;

    if (idTr === "" || idPac === "" || name === "" || date === ""){
        alert("Please fill in all fields");
    }else{
        const treatment = new Treatment(idTr,idPac,name,date);
        UI.addTreatmentToList(treatment);
        Store.addTreatment(treatment);
        UI.clearFields();
    }
});

document.querySelector('#treatment-list').addEventListener('click', (e) => {
  UI.deleteTreatment(e.target);
  Store.removeTreatment(e.target.parentElement.previousElementSibling.textContent);
});
