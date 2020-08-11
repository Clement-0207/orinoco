// [{id:  "1234", quantity: 1}, {id:  "2345", quantity: 2}]

let panier = JSON.parse(localStorage.getItem("panier")) || [];

let suppression = (produitId) => {
    let indexASupprimer = -1;
    for (let i = 0; i < panier.length; i++) {
        if (panier[i].id === produitId) {
            indexASupprimer = i;
        }
        //panier est un tableau ex: [{id: "1234", quantity: 1}, {id: "5678", quantity: 2}]
        //panier[0].quantity = 1
        //produit est un objet
    }

    // mettre à jour la quantity du produit
    // si quantité > 0 - afficher la nouvelle quantité
    panier[indexASupprimer].quantity -= 1;
    if (panier[indexASupprimer].quantity > 0) {
        let soldeQuantity = document.getElementById(produitId);
        soldeQuantity.innerHTML = panier[indexASupprimer].quantity;
    }
    // sinon - retrait de la ligne
    else {
        let indexToDelete = -1;
        let produits = document.getElementById('produits');
        for (let i = 0, row; row = produits.rows[i]; i++) {
            if (row.getElementsByTagName("td")[0].id === (produitId + "-row")) {
                indexToDelete = i;
            }
        }
        produits.deleteRow(indexToDelete);

        // [{id: "1234", quantity: 1}, {id: "5678", quantity: 2}, {id: "1278", quantity: 3}]
        panier.splice(indexASupprimer);
        // [{id: "1234", quantity: 1}, {id: "5678", quantity: 2}]
    }


    fetch("http://localhost:3000/api/teddies/" + produitId)
        .then(reponse => reponse.json())
        .then(function (teddy) {
            // récupérer la valeur de l'article supprimé  -  prixProduit
            let prixProduit = teddy.price / 100; // 40
            // 185,00 € ->  ["185,00", "€"] -> "185,00"
            // récupérer la somme du total euros - totalEuro
            let totalEuroString = document.getElementById('total-euro').innerHTML.split(" ")[0];
            //   "185,00" -> "185.00" -> 185
            let totalEuro = parseFloat(totalEuroString.replace(',', '.'));
            // totalEuro = totalEuro - prixProduit
            // à la suppression recalculer le total
            totalEuro = totalEuro - prixProduit; // 145
            // afficher le nouveau total
            let totalEuroElement = document.getElementById('total-euro');
            totalEuro = totalEuro.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
            totalEuroElement.innerHTML = totalEuro; // 145,00 €

        });

    localStorage.setItem("panier", JSON.stringify(panier));
    // alerte produit supprimé
    alert("Produit supprimé !");
};

let totalEuro = 0;
for (let produit of panier) {
    fetch("http://localhost:3000/api/teddies/" + produit.id)
        .then(reponse => reponse.json())
        .then(function (teddy) {
            let produits = document.getElementById('produits');
            let euros = teddy.price / 100;
            totalEuro += teddy.price * produit.quantity;
            euros = euros.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
            let row = produits.insertRow(0);
            row.innerHTML =
                '<td id="' + produit.id + '-row">'
                + '<img src="' + teddy.imageUrl + '" alt="image ours en peluche" class="img-fluid z-depth-1-half">'
                + '</td>'
                + '<td>'
                + '<h5 class="mt-0">'
                + '<strong>' + teddy.name + '</strong>'
                + '</h5>'
                + '</td>'
                + '<td>' + euros + '</td>'
                + '<td id="' + produit.id + '">' + produit.quantity + '</td>'
                + '<td class="suppression" class="d-flex align-items-center"><i class="btn btn-danger btn-sm float-right delete">x</i></td>';


            let suppressionElement = row.getElementsByClassName("suppression")[0];
            suppressionElement.addEventListener('click', () => { suppression(produit.id) });
            let totalEuroElement = document.getElementById('total-euro');
            let totalEuroString = totalEuro / 100;
            totalEuroString = totalEuroString.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
            totalEuroElement.innerHTML = totalEuroString;
        })
}

let formulaireContact = document.getElementById("contact");
let commander = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        body: JSON.stringify({
            contact: {
                lastName: document.contact.nom.value,
                firstName: document.contact.prenom.value,
                address: document.contact.adresse.value,
                city: document.contact.ville.value,
                email: document.contact.email.value,
            },
            products: panier
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(function (response) {
            console.log(response.orderId);
        });
};
formulaireContact.addEventListener('submit', commander);


// let tableau = [1234, 12345, 123456]
// tableau[0] - chiffre

// let objet = {id: "1234", value: 1234, isValid: true}
// objet.isValid - boolean

// let tableauObjet = [{id: "1234", value: "1234"}, {id: "1234", value: "1234"}]
// tableauObjet[0] - {id: "1234", value: "1234"}
// tableauObjet[0].id

// let tableauDeDinguo = [{id: "1234", value: "1234", colors: ["blue", "green"]}, {id: "1234", value: "1234", colors: ["yellow",  "red"]}]

// afficher la 2ème couleur du premier objet du tableau
// tableauDeDinguo[0].colors[1] - string
// tableauDeDinguo[0].colors - tableau de string
// tableauDeDinguo[0] - objet
// tableauDeDinguo - tableau

// for (let element1 of tableauDeDinguo){} - un objet du tableauDeDinguo




// for (let element2 of tableauDeDinguo[1].colors){} - un element de l'index 1 soit colors qui est un string et que l'element2 est un string

// produit - produit.quantity

//