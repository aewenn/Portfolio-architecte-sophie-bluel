// Page de connexion

// Déclaration des variables

const form = document.querySelector("form"); // Récupération du formulaire
const email = document.querySelector("form #email"); // Récupération du formulaire ("form") et de l'input e-mail ("#email")
const password = document.querySelector("form #password"); // Récupération du formulaire ("form") et de l'input password ("#password")
console.log(password)


// Récupération des valeurs des inputs

// Envoi de la requête à l'API 
function login() {
    const chargeUtile = JSON.stringify({
        email: email.value,
        password: password.value,
    });
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile,
    })
}


// Fonction init

function init() {
    form.addEventListener("submit", (e) => { // Ajout d'un event-listener sur le "submit" du formulaire
        e.preventDefault(); // // Bloque l'action par défaut du navigateur
        const emailUser = email.value;
        const passwordUser = password.value;
        console.log(emailUser, passwordUser)
        console.log(!emailUser.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)) 
        let isvalid = true;
        if (emailUser === "" || !emailUser.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)) { // Récupérer le message d'erreur + display block
            isvalid = false;
            console.log("email")
        } else {
            // display none message d'erreur
        }
        if (passwordUser === "") { // Récupérer le message d'erreur + display block
            isvalid = false;
            console.log("password")
        } else {
            // display none message d'erreur
        }
        if (isvalid) {
            login();
        }

    })
}
init();
