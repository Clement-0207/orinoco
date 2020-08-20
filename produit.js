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
    // Pour vider le tableau
    //localStorage.setItem("panier", JSON.stringify([]));

    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    //panier.push(id);
    panier = panierGestionQuantite(id, panier);

    // ["1234", "2345"]
    // id "2345"
    // [{id:  "1234", quantity: 1}, {id:  "2345", quantity: 2}]
    localStorage.setItem("panier", JSON.stringify(panier));
    alert("Quantité : " + document.getElementById('qtes').value + " article(s) ajouté(s) !");
    //console.log(panier);

};

let panierGestionQuantite = (id, panier) => {
    //document.getElementById('total-euro').innerHTML.split(" ")[0];
    let quantityCompteur = parseInt(document.getElementById('qtes').value);
    //console.log(document.getElementById('qtes').value);
    let indexDuProduitAAjouter = -1;
    for (let i = 0; i < panier.length; i++) {
        // ["1234", "2345"]
        //id ("3456") l'id du produit affiché sur la page
        //panier[i].id ("2345") l'id de l'élément i du panier - i est un nombre de chaque index du tableau
        if (panier[i].id === id) {
            indexDuProduitAAjouter = i;
        }
    }
    if (indexDuProduitAAjouter === -1) {
        // si il existe, on augmente quantity de 1
        panier.push({ id: id, quantity: quantityCompteur });
        // sinon, on ajoute un nouvel objet dans le panier
    } else {
        panier[indexDuProduitAAjouter].quantity += quantityCompteur;
    }
    // recherche dans le panier si l'id  en paramètre existe
    // retourner le panier
    return panier;
};








