// Page d'accueil

// Déclaration des variables

const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters-container");
const token = localStorage.getItem("token")
console.log(token)
const logout = document.querySelector(".logout")
const EditionMode = document.querySelector(".edition-mode")


// Affichage des travaux récupérés

async function DisplayWorks(works) { // Affichage dans la galerie de tous les travaux récupérés depuis le BackEnd
    console.log(works);
    works.forEach((work) => { // Pour chaque "work" ...
        CreateAWork(work); // La fonction "CreateAWork" est appelée
    });
}

async function CreateAWork(work) {  // Affichage de chaque "work"
    const figure = document.createElement("figure"); // Création de l'élément HTML "figure"
    const img = document.createElement("img"); // Création de l'élément HTML "img"
    const figcaption = document.createElement("figcaption"); // Création de l'élement HTML "figcaption"
    img.src = work.imageUrl;
    figcaption.textContent = work.title;
    figure.appendChild(img); // Ajout de l'élément HTML "img" à la fin de l'élément "figure"
    figure.appendChild(figcaption); // Ajout de l'élément HTML "figcaption" à la fin de l'élément "figure"
    gallery.appendChild(figure); // Ajout de l'élément HTML "figure" à la fin de l'élément "gallery"
}


// Récupération des catégories pour les filtres

async function GetCategories() { // Récupération des catégories grâce à une requête GET envoyée à l'API
    try {
        const response = await fetch("http://localhost:5678/api/categories");
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

// Affichage des filtres récupérés

async function DisplayCategories(categories) { // Affichage des catégories 
    categories.forEach((category) => { // Pour chaque "category", la boucle éxécute le code suivant :
        const button = document.createElement("button"); // Création de l'élément HTML "button"
        button.textContent = category.name; // Texte du bouton de filtre = Nom de catégorie
        button.id = category.id; // Id du bouton de filtre = Id de catégorie
        filters.appendChild(button); // Ajout de l'élément HTML "button" à la fin de l'élément "filters"
    });
}


// Filtrage des travaux de la galerie par catégories

async function FilteringWorks(AllWorks) { // Filtrage des travaux
    const buttons = document.querySelectorAll(".filters-container button"); // Récupération de tous les filtres
    buttons.forEach(button => { // Pour chaque bouton ...
        button.addEventListener("click", (e) => { // Au clic, on écoute l'évènement suivant :
            buttonId = e.target.id; // Ecoute de l'ID des boutons
            console.log(buttonId);
            gallery.innerHTML = ""; // Suppression de l'affichage des travaux au clic
            if (buttonId !== "") { // Si l'ID des boutons est différent de "0", le code suivant s'éxécute :
                const WorksByCategory = AllWorks.filter((work) => { // Filtrage de tous les travaux
                    return work.categoryId == buttonId; // Récupération des travaux qui ont un ID égal à l'ID du bouton
                });
                WorksByCategory.forEach(work => { // Pour chaque tour de boucle
                    CreateAWork(work); // Appel de la fonction "CreateAWork"
                });
            } else {
                DisplayWorks(AllWorks); // Sinon, appel de la fonction "DisplayWorks"
            };
        });
    });
};





// Fonction init

async function init() {
        // Mode admin - quand l'utilisateur est connecté
    if (token) { // Si la connexion a bien été établie et qu'on a récupéré le token
        logout.textContent = "logout"; // Changement du texte "login" en "logout" dans la barre de navigation du header
        document.querySelector(".edition-mode").style.display = "block"; // Apparition de la bannière "mode édition"
        document.querySelector(".filters-container").style.display = "none"; // Disparition des filtres
        document.querySelector(".modification a").style.display = "block"; // Apparition du lien "modifier"

        // Déconnexion
        logout.addEventListener("click", () => { // Lors du clic sur "logout"
            localStorage.removeItem("token"); // Le token est supprimé du local storage
            window.location.href = "login.html" // Redirection sur la page de connexion
        })
    }
    const arrayWorks = await GetWorks(); // Création d'un tableau avec les travaux à afficher
    const arrayCategories = await GetCategories(); // Création d'un tableau avec les catégories à afficher
    DisplayWorks(arrayWorks); // Appel de la fonction DisplayWorks
    DisplayCategories(arrayCategories); // Appel de la fonction DisplayCategories
    FilteringWorks(arrayWorks); // Appel de la fonction FilteringWorks
    initModal();

}
init(); 