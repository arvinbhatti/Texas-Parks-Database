
var parkCode = document.getElementById('parkCode').innerHTML;
//console.log(parkCode);

let url=`/getLatLong?parkCode=${parkCode}`;
        fetch(url).then(response => response.json())
        .then( (result) => {
            console.log('success:', result[0].latLong);
            var latLong=result[0].latLong;
            var properties = latLong.split(', ');
          var obj = {};
          properties.forEach(function(property) {
             var i = property.split(':');
             obj[i[0]] = i[1];
          });
          lat=obj.lat;
          lon=obj.long;
          document.getElementById("Latitude").innerHTML=lat;
          document.getElementById("Longitude").innerHTML=lon;
            
        })
        .catch(error => console.log('error:', error));
        