//récupération du total panier après validation de commande
let totalEuro = window.location.search.split("&")[1].split("=")[1];
let euro = document.getElementById('prix-total');
let euros = parseFloat(totalEuro);
euros = euros.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
euro.innerHTML = euros;
//récupération du numéro de commande
let orderId = window.location.search.split("&")[0].split("=")[1];
let numeroCommande = document.getElementById('num-cde');
numeroCommande.innerHTML = orderId;




// url = confirmation.html?orderId=1234-ABDC&totalEuro=19100


// [confirmation.html?orderId=1234-ABDC, totalEuro=19100]
//window.location.search.split("&");

// confirmation.html?orderId=1234-ABDC
//window.location.search.split("&")[0];

// [confirmation.html?orderId, 1234-ABDC]
//window.location.search.split("&").split("=");

// 1234-ABDC // Resultat final \\
//window.location.search.split("&").split("=")[1];

