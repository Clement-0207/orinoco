
let panier = JSON.parse(localStorage.getItem("panier")) || [];
let totalEuro = 0;
for (let id of panier) {
    fetch("http://localhost:3000/api/teddies/" + id)
        .then(reponse => reponse.json())
        .then(function (teddy) {
            let produits = document.getElementById('produits');
            let euros = teddy.price / 100;
            totalEuro += teddy.price;
            euros = euros.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
            let row = produits.insertRow(0);
            row.innerHTML =
                '<th scope="row">'
                + '<img src="' + teddy.imageUrl + '" alt="image ours en peluche" class="img-fluid z-depth-0">'
                + '</th>'
                + '<td>'
                + '<h5 class="mt-3">'
                + '<strong>' + teddy.name + '</strong>'
                + '</h5>'
                + '</td>'
                + '<td>' + euros + '</td>';
            let totalEuroElement = document.getElementById('total-euro');
            var totalEuroString = totalEuro / 100;
            totalEuroString = totalEuroString.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
            totalEuroElement.innerHTML = totalEuroString;
        })
}

var formulaireContact = document.getElementById("contact");
function commander(event) {
    console.log(document.contact.nom.value);
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
}
formulaireContact.addEventListener('submit', commander);

