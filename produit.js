//recherche choix produit//
let id = window.location.search.split("=")[1];
fetch("http://localhost:3000/api/teddies/" + id)
    .then(reponse => reponse.json())
    .then(function (teddy) {
        document.getElementById('serveur-valide').style.display = 'block';
        document.getElementById('erreur').style.display = 'none';
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
    .catch(function (error) {
        document.getElementById('serveur-valide').style.display = 'none';
        document.getElementById('erreur').style.display = 'block';
    });

let ajoutPanier = () => {
    let panier = JSON.parse(localStorage.getItem("panier")) || [];
    panier = panierGestionQuantite(id, panier);
    localStorage.setItem("panier", JSON.stringify(panier));
    alert(document.getElementById('qtes').value + " article(s) ajouté(s) !");
};

let panierGestionQuantite = (id, panier) => {
    let quantityCompteur = parseInt(document.getElementById('qtes').value);
    let indexDuProduitAAjouter = -1;
    for (let i = 0; i < panier.length; i++) {
        if (panier[i].id === id) {
            indexDuProduitAAjouter = i;
        }
    }
    if (indexDuProduitAAjouter === -1) {
        panier.push({ id: id, quantity: quantityCompteur });
    } else {
        panier[indexDuProduitAAjouter].quantity += quantityCompteur;
    }
    return panier;
};








