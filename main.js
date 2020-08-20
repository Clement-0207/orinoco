fetch("http://localhost:3000/api/teddies/")
    .then(reponse => reponse.json())
    .then(function (teddies) {
        let produits = document.getElementById('produits');
        for (let teddy of teddies) {
            let euros = teddy.price / 100;
            euros = euros.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
            produits.innerHTML +=
                "<div class='col-lg-4 col-md-6 mb-4 marge'>"
                + "<div class=card h-100>"
                + "<a href=produit.html?_id=" + teddy._id + "><img class=\"img-fluid card-img-top\" src=" + teddy.imageUrl + " alt=></a>"
                + "<div class=card-body>"
                + "<h4 class=card-title>"
                + "<a href=produit.html?_id=" + teddy._id + ">" + teddy.name + "</a></h4>"
                + "<h5>" + euros + "</h5>"
                + "<p class=card-text>" + teddy.description + "</p>"
                + "</div>"
                + "</div>"
                + "</div>";
        }
    })
    /*var getTeddies = new XMLHttpRequest();
getTeddies.onreadystatechange = function () {
if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
var reponse = JSON.parse(this.responseText);
let produits = document.getElementById('produits');
let teddies = reponse;
for (let teddy of teddies) {
var euros = teddy.price / 100;
euros = euros.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
produits.innerHTML +=
"<div class='col-lg-4 col-md-6 mb-4 marge'>"
+ "<div class=card h-100>"
+ "<a href=produits.html><img class=\"img-fluid card-img-top\" src=" + teddy.imageUrl + " alt=></a>"
+ "<div class=card-body>"
+ "<h4 class=card-title>"
+ "<a href=#>" + teddy.name + "</a></h4>"
+ "<h5>" + euros + "</h5>"
+ "<p class=card-text>" + teddy.description + "</p>"
+ "</div>"
+ "</div>"
+ "</div>";
}
}
};
getTeddies.open("GET", "http://localhost:3000/api/teddies/", true);
getTeddies.send();*/