/*recherche choix produit index.html*/
let id = window.location.search.split("=")[1];
fetch("http://localhost:3000/api/teddies/" + id)
    .then(reponse => reponse.json())
    .then(function (teddy) {
        console.log(teddy);
        let image = document.getElementById('img-produit');
        image.src = teddy.imageUrl;
        let nom = document.getElementById('nom-produit');
        nom.innerHTML = teddy.name;
        let description = document.getElementById('description-produit');
        description.innerHTML = teddy.description;
        let euro = document.getElementById('prix-produit');
        var euros = teddy.price / 100;
        euros = euros.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
        euro.innerHTML = euros;
        let personnalisation = document.getElementById('personnalisation-produit');
        for (let choix of teddy.colors) {
            personnalisation.innerHTML +=
                '<a class="dropdown-item" href="#">' + choix + '</a>'
        }
    })

let ajoutPanier = () => {
    /*afficher le Id déjà ok du produit sélectionné*/
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    panier.push(id);
    localStorage.setItem("panier", JSON.stringify(panier));
    alert("Article ajouté !")
    // Pour vider le tableau
    //localStorage.setItem("panier", JSON.stringify([]));
}





