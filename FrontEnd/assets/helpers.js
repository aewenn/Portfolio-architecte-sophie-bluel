// Récupération des travaux depuis le BackEnd

async function GetWorks() { // Récupération des travaux grâce à une requête GET envoyée à l'API
    try {
        const response = await fetch("http://localhost:5678/api/works");
        return await response.json(); // L'instruction "return" = met fin à l'éxécution de la fonction et définit la valeur à renvoyer 
    } catch (error) {
        console.log(error)
    }
}
