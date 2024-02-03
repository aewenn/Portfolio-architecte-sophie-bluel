// Fenêtre modale

// Déclaration des variables 

const modify = document.querySelector(".modification a"); // Récupération du lien "modifier"
const modalContainer = document.querySelector(".modal-container"); // Récupération du conteneur de la modale
const xmark = document.querySelector(".modal-container .fa-xmark"); // Récupération de la croix


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


// Fonction initModal

function initModal() {
    DisplayGalleryModal();
    OpenModal();
    CloseModal();
};