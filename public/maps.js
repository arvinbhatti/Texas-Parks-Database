
var latitude;
var longitude;
var name;

document.addEventListener('DOMContentLoaded', function () {
    latitude = parseFloat(document.getElementById('Latitude').innerHTML);
    longitude= parseFloat(document.getElementById('Longitude').innerHTML);
    name=document.getElementById('Name').innerHTML;
    console.log(latitude);
    console.log(longitude);
    //console.log(title);
    //latitude = 30.2586;
    //longitude = -97.8242;

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
  zoom: 10,
  center: myLatLng
});

var marker = new google.maps.Marker({
  position: myLatLng,
  map: map,
  title: name
});
}