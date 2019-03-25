
var latitude;
var longitude;

document.addEventListener('DOMContentLoaded', function () {
    latitude = 30.2586;
    longitude = -97.8242;

  var url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBN3LuWqqwjKGG_ofNtT181WQNMAVaJnVs&callback=initMap" ;
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    //script.async = true;
    //script.defer = true;
    document.getElementsByTagName("head")[0].appendChild(script);
});


var map;
function initMap() {
var myLatLng = {lat: latitude, lng: longitude};

var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 12,
  center: myLatLng
});

var marker = new google.maps.Marker({
  position: myLatLng,
  map: map,
  title: 'Barton Creek Wilderness Park'
});
}