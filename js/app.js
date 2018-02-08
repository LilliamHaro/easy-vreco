function initMap() {
  var lima = {
    // latitud y longitud de la ciudad de lima
    lat: -12.026733806103568,
    lng: -76.98777915
  };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    // ubicando el centro del mapa respecto a la variable Lima
    center: lima
  });

  var marker = new google.maps.Marker({
    // position define la posicion del marcador
    position: lima,
    map: map,
    // asignando imagen de bicileta como marcador
    icon: 'assets/bicicleta.png'
  });

  function searchCurrentPosition(event) {
    event.preventDefault();
    if (navigator.geolocation) {
      // obteniendo la posicion actual del usuario
      navigator.geolocation.getCurrentPosition(function(position) {
        // ubicando el marcador con la posición actual del usuario
        coordenadas = position.coords;
        marker = new google.maps.Marker({
          position: {
            lat: coordenadas.latitude,
            lng: coordenadas.longitude},
          map: map,
          icon: 'assets/bicicleta.png'
        });
        map.setZoom(18);
        // ubicando el centro del mapa con la latitud y la longitud
        map.setCenter({
          lat: coordenadas.latitude,
          lng: coordenadas.longitude});
      });
    }
  }
  // Trazando la ruta
  // obteniendo datos de los inputs
  var originPoint = document.getElementById('originPoint');
  var destinyPoint = document.getElementById('destinyPoint');

  // usando la libraría Autocomplete para el autocompletado de los lugares
  new google.maps.places.Autocomplete(originPoint);
  new google.maps.places.Autocomplete(destinyPoint);

  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
  // calculando la ruta
  //
  //
  window.addEventListener('load', function(event) {
    document.getElementById('btn').addEventListener('click', function(event) {
      calcRoute(directionsService, directionsDisplay);
    });
    document.getElementById('myPosition').addEventListener('click', searchCurrentPosition);
  });
}
