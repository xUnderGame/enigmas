var mymap = L.map('map').setView([41.45359896116054, 2.186311483383179], 20);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18
}).addTo(mymap);

const showLocation = async (lat, long) => {
    let response = await fetch("https://nominatim.openstreetmap.org/reverse?lat=" + lat + "&lon=" + long + "&format=json");
    let data = await response.json();
    window.parent.postMessage(`${data.address.city};${lat};${long}`, '*');
};

var marker = L.marker([0, 0]).addTo(mymap);
mymap.on('click', function (e) {
    // Actualizar la ubicación del marcador
    marker.setLatLng(e.latlng);

    // Enviar la informacion al padre.
    showLocation(e.latlng.lat, e.latlng.lng);
});