let panier = JSON.parse(localStorage.getItem("panier")) || [];

let suppression = (produitId) => {
    let indexASupprimer;
    for (let i = 0; i < panier.length; i++) {
        if (panier[i].id === produitId) {
            indexASupprimer = i;
        }
    }
    let quantiteSupprimee = panier[indexASupprimer].quantity;
    let positionDansTableauHtml;
    let tableauHtml = document.getElementById('produits');
    for (let i = 0, row; row = tableauHtml.rows[i]; i++) {
        if (row.getElementsByTagName("td")[0].id === (produitId + "-row")) {
            positionDansTableauHtml = i;
        }
    }
    tableauHtml.deleteRow(positionDansTableauHtml);

    panier.splice(indexASupprimer, 1);
    if (panier.length === 0) {
        document.getElementById('panierPlein').style.display = 'none';
        document.getElementById('panierVide').style.display = 'block';
    }

    fetch("http://localhost:3000/api/teddies/" + produitId)
        .then(reponse => reponse.json())
        .then(function (teddy) {
            document.getElementById('serveur-valide').style.display = 'block';
            document.getElementById('erreur').style.display = 'none';
            let prixProduit = teddy.price * quantiteSupprimee / 100;
            let totalEuroString = document.getElementById('total-euro').innerHTML.split(" ")[0];
            let totalEuro = parseFloat(totalEuroString.replace(',', '.').replace(/\s/g, ''));
            totalEuro = totalEuro - prixProduit;
            let totalEuroElement = document.getElementById('total-euro');
            totalEuro = totalEuro.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
            totalEuroElement.innerHTML = totalEuro;
        })
        .catch(function (error) {
            document.getElementById('serveur-valide').style.display = 'none';
            document.getElementById('erreur').style.display = 'block';
        });
    localStorage.setItem("panier", JSON.stringify(panier));
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
            document.getElementById('serveur-valide').style.display = 'block';
            document.getElementById('erreur').style.display = 'none';
            let produits = document.getElementById('produits');
            let euros = teddy.price / 100;
            totalEuro += teddy.price * produit.quantity;
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
        .catch(function (error) {
            document.getElementById('serveur-valide').style.display = 'none';
            document.getElementById('erreur').style.display = 'block';
        });
}
//pattern js
let validateNom = () => {
    if (!/^[a-zA-Z][A-Za-z-\s]+$/.test(document.contact.nom.value)) {
        document.getElementById("validationNom").setCustomValidity("Not valid");
        return false;
    }
    document.getElementById("validationNom").setCustomValidity('');
    return true;
}
let validatePrenom = () => {
    if (!/^[a-zA-Z][A-Za-z-\s]+$/.test(document.contact.prenom.value)) {
        document.getElementById("validationPrenom").setCustomValidity("Not valid");
        return false;
    }
    document.getElementById("validationPrenom").setCustomValidity('');
    return true;
}
let validateVille = () => {
    if (!/^[a-zA-Z][A-Za-z-\s]+$/.test(document.contact.ville.value)) {
        document.getElementById("validationVille").setCustomValidity("Not valid");
        return false;
    }
    document.getElementById("validationVille").setCustomValidity('');
    return true;
}
let validateEmail = () => {
    if (!/^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/.test(document.contact.email.value)) {
        document.getElementById("validationEmail").setCustomValidity("Not valid");
        return false;
    }
    document.getElementById("validationEmail").setCustomValidity('');
    return true;
}

let formulaireContact = document.getElementById("contact");
let commander = (event) => {
    event.preventDefault();
    let formulaireValide = true;
    formulaireValide = validateNom() && formulaireValide;
    formulaireValide = validatePrenom() && formulaireValide;
    formulaireValide = validateVille() && formulaireValide;
    formulaireValide = validateEmail() && formulaireValide;
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
                document.getElementById('serveur-valide').style.display = 'block';
                document.getElementById('erreur').style.display = 'none';
                console.log(response.orderId);
                let totalEuroString = document.getElementById('total-euro').innerHTML.split(" ")[0];
                let totalEuro = parseFloat(totalEuroString.replace(',', '.').replace(/\s/g, ''));
                localStorage.setItem("panier", JSON.stringify([]));
                window.location.href = 'confirmation.html?orderId=' + response.orderId + '&totalEuro=' + totalEuro;
            })
            .catch(function (error) {
                document.getElementById('serveur-valide').style.display = 'none';
                document.getElementById('erreur').style.display = 'block';
            });
    }
};
formulaireContact.addEventListener('submit', commander);


window.addEventListener('load', function () {
    let forms = document.getElementsByClassName('needs-validation');
    console.log(forms);
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