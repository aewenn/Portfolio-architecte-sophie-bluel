// Fenêtre modale

// Déclaration des variables 

const modify = document.querySelector(".modification a"); // Récupération du lien "modifier"
const modalContainer = document.querySelector(".modal-container"); // Récupération du conteneur de la modale
const xmark = document.querySelector(".modal-container .fa-xmark"); // Récupération de la croix page 1
const xmark2 = document.querySelector(".modal-2 .fa-xmark"); // Récupération de la croix page 2
const modalGallery = document.querySelector(".modal-gallery"); // Récupération du conteneur de la galerie
const modal1stpage = document.querySelector(".modal"); // Récupération de la première page de la modale
const modal2ndpage = document.querySelector(".modal-2"); // Récupération de la deuxième page de la modale
const buttonAddPhoto = document.querySelector(".btnAddPhoto"); // Récupération du bouton "Ajouter une photo"
const backto1stpage = document.querySelector(".fa-arrow-left"); // Récupération de la flèche gauche
const buttonSubmitPhoto = document.querySelector(".btnSubmitPhoto") // Récupération du bouton "valider"
const inputTitle = document.getElementById("title")
const selectCategory = document.getElementById("category")
const errorTitle = document.querySelector(".error-title")
const errorSelect = document.querySelector(".error-select")


// Affichage dynamique de la modale

function OpenModal() { // Ouverture de la modale
    modify.addEventListener("click", () => { // Au clic sur "modifier", la modale apparaît
        modalContainer.style.display = "flex";
    })
};

function CloseModal() { // Fermeture de la modale
    xmark.addEventListener("click", () => { // Au clic sur la croix, la 1ère page de la modale disparaît
        modalContainer.style.display = "none";
    })
    xmark2.addEventListener("click", () => { // Au clic sur la croix, la 2ème page de la modale disparaît
        modalContainer.style.display = "none";
    })
    modalContainer.addEventListener("click", (e) => { // Au clic en dehors de la modale, la modale disparaît 
        if (e.target.className === "modal-container") {
            modalContainer.style.display = "none";
        }
    })
};


// Affichage de la galerie dans la première page de la modale

async function DisplayGalleryModal() { // Fonction d'affichage des travaux
    const works = await GetWorks() // On récupère les travaux
    works.forEach((work) => { // Pour chaque projet contenu dans le tableau de travaux
        const figure = document.createElement("figure"); // Création de l'élément HTML "figure"
        const img = document.createElement("img"); // Création de l'élément HTML "img"
        const trashcan = document.createElement("i"); // Création de l'icône poubelle
        const span = document.createElement("span"); // Création du fond noir
        trashcan.classList.add("fa-solid", "fa-trash-can"); // Ajout des classes à l'icône poubelle
        trashcan.id = work.id; // L'id de l'icône correspond à l'id du projet
        img.src = work.imageUrl;
        figure.appendChild(img);
        figure.appendChild(span);
        span.appendChild(trashcan)
        modalGallery.appendChild(figure);
    });
}


// Affichage de la deuxième page de la modale

function OpenAddProjetFormModal() {
    modal1stpage.style.display = "none"; // Disparation de la première page de la modale
    modal2ndpage.style.display = "flex"; // Apparition de la deuxième page de la modale
}

// Retour sur la première page de la modale au clic sur la flèche 

function OpenGalleryModal() {
    backto1stpage.addEventListener("click", () => { // Au clic sur la flèche 
        modal2ndpage.style.display = "none"; // Disparition de la deuxième page de la modale
        modal1stpage.style.display = "flex"; // Apparition de la première page de la modale
    });
}


// Suppression d'un projet

async function DeleteWork() {
    await DisplayGalleryModal(); // Il faut d'abord gérer l'affichage des icônes
    const Alltrashcan = document.querySelectorAll(".fa-trash-can"); // On récupère toutes les icônes
    Alltrashcan.forEach(trashcan => { // Pour chaque icône
        trashcan.addEventListener("click", () => { // évènement au clic
            const WorkId = trashcan.id; // L'id de chaque projet correspond à l'id de chaque îcone
            fetch("http://localhost:5678/api/works/" + WorkId, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                }
            })
                .then(response => {
                    if (!response.ok) {
                        console.log("La suppression n'a pas abouti.")
                    }
                    return response.json();
                })
        })
    })
}


// Ajout d'un projet

function AddWorks() {
    buttonSubmitPhoto.addEventListener("submit", () => {
    })
}


// Contrôles des champs du formulaire lors de l'ajout de projet

function ControlFormAddProjet() {
    buttonSubmitPhoto.addEventListener("click", () => {
        if (inputTitle.value === "") {
            errorTitle.style.display = "flex"; // Un message d'erreur s'affiche si le champ "Titre" est vide
        } else {
            errorTitle.style.display = "none";
        }
        if (selectCategory.value === "0") {
            errorSelect.style.display = "flex"; // Un message d'erreur s'affiche si aucune option n'a été sélectionnée
        } else {
            errorSelect.style.display = "none";
        }
    })
}



// Fonction initModal

function initModal() {
    OpenModal();
    CloseModal();
    buttonAddPhoto.addEventListener("click", () => { // Au clic sur le bouton "Ajouter une photo"
        OpenAddProjetFormModal(); // La fonction "OpenAddProjetFormModal" s'éxécute
    });
    OpenGalleryModal();
    DeleteWork();
    AddWorks();
    ControlFormAddProjet();
};