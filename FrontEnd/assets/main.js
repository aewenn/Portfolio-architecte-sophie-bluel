// Déclarations des variables

const gallery = document.querySelector(".gallery");


// Récupération des travaux depuis le BackEnd

async function GetWorks() { // Cette fonction permet de récupérer les travaux (getWorks) grâce à une requête GET envoyée à l'API
    try {
        const response = await fetch("http://localhost:5678/api/works");
        return await response.json(); // L'instruction "return" met fin à l'éxécution de la fonction et définit la valeur à renvoyer 
    } catch (error) {
        console.log(error)
    }
}


// Affichage des travaux récupérés

async function DisplayWorks(works) { // Cette fonction permet d'afficher dans la galerie les travaux récupérés depuis le BackEnd
    console.log(works);
    works.forEach((work) => { // Pour chaque "work", la boucle éxécute le code suivant
        const figure = document.createElement("figure"); // Création de l'élément HTML "figure"
        const img = document.createElement("img"); // Création de l'élément HTML "img"
        const figcaption = document.createElement("figcaption"); // Création de l'élement HTML "figcaption"
        img.src = work.imageUrl;
        figcaption.textContent = work.title;
        figure.appendChild(img); // Ajoute l'élément HTML "img" à la fin de l'élément "figure"
        figure.appendChild(figcaption); // Ajoute l'élément HTML "figcaption" à la fin de l'élément "figure"
        gallery.appendChild(figure); // Ajoute l'élément HTML "figure" à la fin de l'élément "gallery"
    })
}


// Récupération des catégories pour les filtres

async function GetCategories() {
    try {
        const application = await fetch("http://localhost:5678/api/categories");
        return await application.json(); 
    } catch (error) {
        console.log(error)
    }
}

async function init() {
    const arrayWorks = await GetWorks(); // Cette variable permet de créer un tableau avec les travaux à afficher
    DisplayWorks(arrayWorks);
    GetCategories();
}
init();