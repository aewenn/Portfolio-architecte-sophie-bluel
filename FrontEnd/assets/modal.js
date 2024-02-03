// Fenêtre modale

// Déclaration des variables 

const modify = document.querySelector(".modification a"); // Récupération du lien "modifier"
const modalContainer = document.querySelector(".modal-container"); // Récupération du conteneur de la modale
const xmark = document.querySelector(".modal-container .fa-xmark"); // Récupération de la croix
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
    xmark.addEventListener("click", (e) => { // Au clic sur la croix, la modale disparaît
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

buttonAddPhoto.addEventListener("click", (e) => {
    modal1stpage.style.display = "none";
    modal2ndpage.style.display = "flex";
})

// Retour sur la première page de la modale au clic sur la flèche 

backto1stpage.addEventListener("click", (e) => {
    modal2ndpage.style.display = "none";
    modal1stpage.style.display = "flex";
})

// Fonction initModal

function initModal() {
    DisplayGalleryModal();
    OpenModal();
    CloseModal();
};