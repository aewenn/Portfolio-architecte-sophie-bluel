// Fenêtre modale

// Déclaration des variables 

const modify = document.querySelector(".modification p"); // Récupération du lien "modifier"
const modalContainer = document.querySelector(".modal-container"); // Récupération du conteneur de la modale
const xmark = document.querySelector(".modal-container .fa-xmark"); // Récupération de la croix page 1
const xmark2 = document.querySelector(".modal-2 .fa-xmark"); // Récupération de la croix page 2
const modalGallery = document.querySelector(".modal-gallery"); // Récupération du conteneur de la galerie
const modal1stpage = document.querySelector(".modal"); // Récupération de la première page de la modale
const modal2ndpage = document.querySelector(".modal-2"); // Récupération de la deuxième page de la modale
const buttonAddPhoto = document.querySelector(".btnAddPhoto"); // Récupération du bouton "Ajouter une photo"
const backto1stpage = document.querySelector(".fa-arrow-left"); // Récupération de la flèche gauche
const buttonSubmitPhoto = document.querySelector(".btnSubmitPhoto") // Récupération du bouton "valider"
const inputTitle = document.getElementById("title") // Récupération de l'input "titre"
const selectCategory = document.getElementById("category") // Récupération du select "catégories"
const formAddPhoto = document.getElementById("form-addphoto") // Récupération du formulaire
const inputFile = document.getElementById("file") // Récupération de l'input permettant d'ajouter un fichier
const prewiewImg = document.getElementById("image") // Récupération de l'image de prévisualisation
const label = document.querySelector(".addPhoto-file") // Récupération du label "Ajouter photo"
const previewTextImg = document.querySelector(".addPhoto-container p") // Récupération du texte précisant le type d'image et la taille
console.log(formAddPhoto)

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
    xmark2.addEventListener("click", () => { // Au clic sur la croix, la 2ème page de la modale disparaît, et reset sur le formulaire
        modalContainer.style.display = "none";
        prewiewImg.style.display = "none";
        label.classList.remove("addPhoto-file2")
        previewTextImg.innerHTML = "jpg, png : 4mo max"
        formAddPhoto.reset(); // reset du formulaire page 2 
    })
    modalContainer.addEventListener("click", (e) => { // Au clic en dehors de la modale, la modale disparaît, et reset sur le formulaire
        if (e.target.className === "modal-container") {
            modalContainer.style.display = "none";
            prewiewImg.style.display = "none";
            label.classList.remove("addPhoto-file2")
            previewTextImg.innerHTML = "jpg, png : 4mo max"
            formAddPhoto.reset(); // reset du formulaire page 2 
        }
    })
};


// Affichage de la galerie dans la première page de la modale

async function DisplayGalleryModal() { // Fonction d'affichage des travaux
    modalGallery.innerHTML = ""
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
    label.classList.remove("addPhoto-file2")
    previewTextImg.innerHTML = "jpg, png : 4mo max"
}

// Retour sur la première page de la modale au clic sur la flèche 

function OpenGalleryModal() {
    backto1stpage.addEventListener("click", () => { // Au clic sur la flèche 
        modal2ndpage.style.display = "none"; // Disparition de la deuxième page de la modale
        modal1stpage.style.display = "flex"; // Apparition de la première page de la modale
        prewiewImg.style.display = "none";
        label.classList.remove("addPhoto-file2")
        previewTextImg.innerHTML = "jpg, png : 4mo max"
        formAddPhoto.reset(); // reset du formulaire page 2 
    });
}


// Suppression d'un projet

async function DeleteWork() {
    const Alltrashcan = document.querySelectorAll(".fa-trash-can"); // On récupère toutes les icônes
    Alltrashcan.forEach(trashcan => { // Pour chaque icône
        trashcan.addEventListener("click", (e) => { // évènement au clic
            e.preventDefault();
            const WorkId = trashcan.id; // L'id de chaque projet correspond à l'id de chaque îcone
            fetch("http://localhost:5678/api/works/" + WorkId, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            }).then(() => {
                DisplayGalleryModal();
            })
        })
    })
}


// Prévisualisation de l'image lors de l'ajout de projet

function PreviewNewWork() {
    inputFile.addEventListener("change", () => { // Evènement permettant de changer l'aperçu
        const fileImg = inputFile.files[0];
        console.log(fileImg)
        if (fileImg) { // Si un fichier est sélectionné
            const reader = new FileReader(); // FileReader permet de lire le contenu d'un fichier de façon asynchrone
            reader.onload = function (e) { // Evènement déclenché lorsque la lecture est complète
                prewiewImg.src = e.target.result; // On change l'image
                prewiewImg.style.display = "block"; // L'image apparaît dans l'aperçu
                label.classList.add("addPhoto-file2"); // On ajoute une classe permettant de cacher l'input pour ajouter une photo
                previewTextImg.innerHTML = ""; // On cache le texte précisant le type d'image et la taille max
            };
            reader.readAsDataURL(fileImg) // On lit le fichier uploadé
        } else {
            prewiewImg.style.display = "none"; // Sinon, l'image n'apparaît pas
        }
    })
}


// Ajout d'un projet

function AddWorks() {
    console.log(inputFile.files[0])
    const formData = new FormData();
    formData.append("title", inputTitle.value)
    formData.append("image", inputFile.files[0])
    formData.append("category", selectCategory.value)

    fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: formData,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Erreur lors de l'ajout de fichier.")
        }
        return response.json()
    }).then(() => {
        formAddPhoto.reset()
        prewiewImg.style.display = "none";
        modal2ndpage.style.display = "none";
        modal1stpage.style.display = "flex";
    }).then(() => {
        DisplayGalleryModal();
    })
}

// Contrôles des champs du formulaire lors de l'ajout de projet

function ControlFormAddProjet() {
    formAddPhoto.addEventListener("submit", (e) => { // évènement sur le bouton "valider"
        e.preventDefault();
        let isvalid = true;
        if (prewiewImg.value === "") {
            isvalid = false;
        }
        if (inputTitle.value === "") {
            isvalid = false;
        }
        if (selectCategory.value === "0") {
            isvalid = false;
            document.getElementById("error-select").style.display = "flex";
        }
        if (isvalid) {
            AddWorks();
        }
    })
}


// Fonction initModal

async function initModal() {
    OpenModal();
    CloseModal();
    buttonAddPhoto.addEventListener("click", () => { // Au clic sur le bouton "Ajouter une photo"
        OpenAddProjetFormModal(); // La fonction "OpenAddProjetFormModal" s'éxécute
    });
    OpenGalleryModal();
    await DisplayGalleryModal(); // Il faut d'abord gérer l'affichage des projets
    DeleteWork();
    ControlFormAddProjet();
    PreviewNewWork();
};