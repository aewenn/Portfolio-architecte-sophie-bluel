// Fenêtre modale

// Déclaration des variables 

const modify = document.querySelector(".modification a"); // Récupération du lien "modifier"
const modalContainer = document.querySelector(".modal-container"); // Récupération du conteneur de la modale
const xmark = document.querySelector(".modal-container .modal-2 .fa-xmark"); // Récupération de la croix
const modal1stpage = document.querySelector(".modal");
const modal2ndpage = document.querySelector(".modal-2");
const buttonAddPhoto = document.querySelector(".btnAddPhoto");
const backto1stpage = document.querySelector(".fa-arrow-left")


// Affichage dynamique de la modale

function OpenModal() { // Ouverture de la modale
    modify.addEventListener("click", () => { // Au clic sur "modifier", la modale apparaît
        modalContainer.style.display = "flex";
    })
};

function CloseModal() { // Fermeture de la modale
    xmark.addEventListener("click", () => { // Au clic sur la croix, la modale disparaît
            modalContainer.style.display = "none";
        })
    modalContainer.addEventListener("click", (e) => { // Au clic en dehors de la modale, la modale disparaît 
        if (e.target.className === "modal-container") {
            modalContainer.style.display = "none";
        }
    })
};


// Affichage de la galerie dans la première page de la modale

function DisplayGalleryModal() {
    GetWorks();
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
    DisplayGalleryModal(); // Rappel de la fonction permettant d'afficher les travaux
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