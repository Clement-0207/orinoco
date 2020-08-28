fetch("http://localhost:3000/api/teddies/")
    .then(reponse => reponse.json())
    .then(function (teddies) {
        document.getElementById('serveur-valide').style.display = 'block';
        document.getElementById('erreur').style.display = 'none';
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
    .catch(function (error) {
        document.getElementById('serveur-valide').style.display = 'none';
        document.getElementById('erreur').style.display = 'block';
    });