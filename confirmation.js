let orderId = window.location.search.split("&")[0].split("=")[1];
let totalEuro = window.location.search.split("&")[1].split("=")[1];

// confirmation.html?orderId=1234-ABDC&totalEuro=19100


// [confirmation.html?orderId=1234-ABDC, totalEuro=19100]
//window.location.search.split("&");

// confirmation.html?orderId=1234-ABDC
//window.location.search.split("&")[0];

// [confirmation.html?orderId, 1234-ABDC]
//window.location.search.split("&").split("=");

// 1234-ABDC // Resultat final \\
//window.location.search.split("&").split("=")[1];

