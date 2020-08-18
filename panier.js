// [{id:  "1234", quantity: 1}, {id:  "2345", quantity: 2}]

let panier = JSON.parse(localStorage.getItem("panier")) || [];

let suppression = (produitId) => {
    let indexASupprimer;
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
    //panier[indexASupprimer].quantity -= 1; utile pour décrémentation
    /*if (panier[indexASupprimer].quantity > 0) {
        let soldeQuantity = document.getElementById(produitId);
        soldeQuantity.innerHTML = panier[indexASupprimer].quantity;
    }else{}*/
    // sinon - retrait de la ligne
    let quantiteSupprimee = panier[indexASupprimer].quantity;
    let positionDansTableauHtml;
    let tableauHtml = document.getElementById('produits');
    for (let i = 0, row; row = tableauHtml.rows[i]; i++) {
        if (row.getElementsByTagName("td")[0].id === (produitId + "-row")) {
            positionDansTableauHtml = i;

        }
    }
    tableauHtml.deleteRow(positionDansTableauHtml);


    // [{id: "1234", quantity: 1}, {id: "5678", quantity: 2}, {id: "1278", quantity: 3}]
    panier.splice(indexASupprimer, 1);
    if (panier.length === 0) {
        document.getElementById('panierPlein').style.display = 'none';
        document.getElementById('panierVide').style.display = 'block';
    }
    // [{id: "1234", quantity: 1}, {id: "5678", quantity: 2}]



    fetch("http://localhost:3000/api/teddies/" + produitId)
        .then(reponse => reponse.json())
        .then(function (teddy) {
            // récupérer la valeur de l'article supprimé  -  prixProduit
            let prixProduit = teddy.price * quantiteSupprimee / 100; // 40
            // 185,00 € ->  ["185,00", "€"] -> "185,00"
            // récupérer la somme du total euros - totalEuro
            let totalEuroString = document.getElementById('total-euro').innerHTML.split(" ")[0];
            //   "185,00" -> "185.00" -> 185
            let totalEuro = parseFloat(totalEuroString.replace(',', '.').replace(/\s/g, ''));
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
if (panier.length > 0) {
    document.getElementById('panierPlein').style.display = 'block';
    document.getElementById('panierVide').style.display = 'none';
} else {
    document.getElementById('panierPlein').style.display = 'none';
    document.getElementById('panierVide').style.display = 'block';
}
for (let produit of panier) {
    fetch("http://localhost:3000/api/teddies/" + produit.id)
        .then(reponse => reponse.json())
        .then(function (teddy) {
            let produits = document.getElementById('produits');
            let euros = teddy.price / 100;
            totalEuro += teddy.price * produit.quantity;
            //console.log(produit.quantity);
            euros = euros.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
            let row = produits.insertRow(0);
            row.innerHTML =
                '<td id="' + produit.id + '-row">'
                + '<img src="' + teddy.imageUrl + '" alt="image ours en peluche" class="img-fluid-panier z-depth-1-half">'
                + '</td>'
                + '<td>'
                + '<h5 class="mt-0">'
                + '<strong>' + teddy.name + '</strong>'
                + '</h5>'
                + '</td>'
                + '<td class="text-center">' + euros + '</td>'
                + '<td class="text-center font-weight-bold" id="' + produit.id + '">' + produit.quantity + '</td>'
                + '<td class="suppression" class="d-flex align-items-center"><i class="btn btn-danger btn-sm float-right delete">x</i></td>';


            let suppressionElement = row.getElementsByClassName("suppression")[0];
            suppressionElement.addEventListener('click', () => { suppression(produit.id) });
            let totalEuroElement = document.getElementById('total-euro');
            let totalEuroString = totalEuro / 100;
            totalEuroString = totalEuroString.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
            totalEuroElement.innerHTML = totalEuroString;
        })
}
//pattern js
let validateNom = () => {
    if (!/^[a-zA-Z][A-Za-z-\s]+$/.test(document.contact.nom.value)) {
        document.getElementById("validationNom").setCustomValidity("Not valid");
        return false;
    }
    return true;
}
let validatePrenom = () => {
    if (!/^[a-zA-Z][A-Za-z-\s]+$/.test(document.contact.prenom.value)) {
        document.getElementById("validationPrenom").setCustomValidity("Not valid");
        return false;
    }
    return true;
}
let validateVille = () => {
    if (!/^[a-zA-Z][A-Za-z-\s]+$/.test(document.contact.ville.value)) {
        document.getElementById("validationVille").setCustomValidity("Not valid");
        return false;
    }
    return true;
}
let validateEmail = () => {
    if (!/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(document.contact.email.value)) {
        document.getElementById("validationEmail").setCustomValidity("Not valid");
        return false;
    }
    return true;
}

let formulaireContact = document.getElementById("contact");
let commander = (event) => {
    event.preventDefault();
    let formulaireValide = true;
    /*if (!validateNom()) {//! avant une comparaison permet de simplifier le "validateNom === false"
        formulaireValide = false;
    }
    if (!validatePrenom()) {
        formulaireValide = false;
    }
    if (!validateVille()) {
        formulaireValide = false;
    }
    if (!validateEmail()) {
        formulaireValide = false; étape SI imbrication simple
    }*/

    /*formulaireValide = formulaireValide && validateNom();
    formulaireValide = formulaireValide && validatePrenom();
    formulaireValide = formulaireValide && validateVille();
    formulaireValide = formulaireValide && validateEmail(); étape ET deux conditions obligatoires*/

    formulaireValide = validateNom() && validatePrenom() && validateVille() && validateEmail();

    // -> formulaireValide : false

    // [{id:  "1234", quantity: 1}, {id:  "2345", quantity: 2}]
    // ["1234", "2345"]
    if (formulaireValide) {
        let products = panier.map(product => product.id);
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
                products: products
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(function (response) {
                console.log(response.orderId);
                let totalEuroString = document.getElementById('total-euro').innerHTML.split(" ")[0];
                let totalEuro = parseFloat(totalEuroString.replace(',', '.'));
                localStorage.setItem("panier", JSON.stringify([]));
                window.location.href = 'confirmation.html?orderId=' + response.orderId + '&totalEuro=' + totalEuro; //confirmation.html?orderId=1234-ABDC&totalEuro=19100
            });
    }

};
formulaireContact.addEventListener('submit', commander);


window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    let forms = document.getElementsByClassName('needs-validation');
    console.log(forms);
    // Loop over them and prevent submission
    Array.prototype.filter.call(forms, function (form) {
        console.log(form);
        form.addEventListener('submit', function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}, false);


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