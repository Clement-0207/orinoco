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