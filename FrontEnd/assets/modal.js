// Fenêtre modale

// Déclaration des variables 

const modify = document.querySelector(".modification a"); // Récupération du lien "modifier"
const modalContainer = document.querySelector(".modal-container"); // Récupération du conteneur de la modale
const xmark = document.querySelector(".modal-container .fa-xmark"); // Récupération de la croix page 1
const xmark2 = document.querySelector(".modal-2 .fa-xmark");
const modalGallery = document.querySelector(".modal-gallery"); // Récupération du conteneur de la galerie
const modal1stpage = document.querySelector(".modal"); // Récupération de la première page de la modale
const modal2ndpage = document.querySelector(".modal-2"); // Récupération de la deuxième page de la modale
const buttonAddPhoto = document.querySelector(".btnAddPhoto"); // Récupération du bouton "Ajouter une photo"
const backto1stpage = document.querySelector(".fa-arrow-left"); // Récupération de la flèche gauche


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

function DisplayGalleryModal() { // Fonction d'affichage des travaux
    GetWorks().then((works) => {
        works.forEach((work) => {
            CreateWorkModal(work);
        });
    });
}


// Création des travaux dans la galerie en 1ère page de la modale

function CreateWorkModal(work) { // Fonction de création des travaux
    const figure = document.createElement("figure"); // Création de l'élément HTML "figure"
    const img = document.createElement("img"); // Création de l'élément HTML "img"
    const trashcan = document.createElement("i"); // Création de l'icône poubelle
    const span = document.createElement("span"); 
    trashcan.classList.add("fa-solid", "fa-trash-can");
    trashcan.id = work.id;
    img.src = work.imageUrl;
    figure.appendChild(img);
    figure.appendChild(span);
    span.appendChild(trashcan)
    modalGallery.appendChild(figure);
}

// Affichage de la deuxième page de la modale

function OpenAddProjetFormModal() {
    modal1stpage.style.display = "none"; // Disparation de la première page de la modale
    modal2ndpage.style.display = "flex"; // Apparition de la deuxième page de la modale
}

// Retour sur la première page de la modale au clic sur la flèche 

function OpenGalleryModal() {
    backto1stpage.addEventListener("click", (e) => { // Au clic sur la flèche 
        modal2ndpage.style.display = "none"; // Disparition de la deuxième page de la modale
        modal1stpage.style.display = "flex"; // Apparition de la première page de la modale
    })
}

// Fonction initModal

function initModal() {
    DisplayGalleryModal();
    OpenModal();
    CloseModal();
    buttonAddPhoto.addEventListener("click", (e) => { // Au clic sur le bouton "Ajouter une photo"
        OpenAddProjetFormModal(); // La fonction "OpenAddProjetFormModal" s'éxécute
    });
    OpenGalleryModal();
};