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
        if (emailUser !== "sophie.bluel@test.tld" || !emailUser.match(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/)) {
            isvalid = false;
            document.getElementById("errormail").style.display = "block";
            console.log("email")
        } else {
            document.getElementById("errormail").style.display = "none";
        }
        if (passwordUser !== "S0phie") {
            isvalid = false;
            document.getElementById("errorpassword").style.display = "block";
            console.log("password")
        } else {
            document.getElementById("errorpassword").style.display = "none";
        }
        if (isvalid) {
            login();
        }

    })
}
init();
