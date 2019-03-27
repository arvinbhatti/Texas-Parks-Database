function myFunction() {

///////////////// ZIP to Lat/Long API Request /////////////////
	var zipKey = "c5qxOg7E7XHGPypOWqWliSM64AHEt3FKkZbsZplNyDkYth7ZwHDZxDlfKw7NRYgs/";
	var zipEndpoint = "https://www.zipcodeapi.com/rest/";
	var zipType = "json";
	var zipUnits = "degrees";
	var zipLat;
	var zipLong;

	//gets zipcode text
	var zipcode = document.getElementById("zipInput").value;
	// set enter event listener
	enterEvent(document.getElementById("zipInput"));

	//console.log("zip code: " + zipcode);
	zipUrl = zipEndpoint + zipKey + "info." + zipType + "/" + zipcode + "/" + zipUnits;
	var zipRequest = new XMLHttpRequest()
	// Open a new connection, using the GET request on the URL endpoint
	zipRequest.open('GET', zipUrl, true)
	zipRequest.onload = function () {
    // Begin accessing JSON data here
		var data = JSON.parse(this.response)
		//console.log(data);
		zipLat = data.lat;
		zipLong = data.lng;
		parkReq(zipLat, zipLong);
	}
	// Send request
	zipRequest.send();
}

////////////////////// Parks API Request //////////////////////

function parkReq(zipLat, zipLong) {
//list all the parks
var park = "";
var limit = "600"; 

 // complete the url
var endpoint = "https://developer.nps.gov/api/v1/parks?parkCode=";
var apiKey = "nL3ttK1D6ACPakfdXuHtFVwqZoUqBUNakkT4mqZ6";
var fullUrl = endpoint + park + "&limit=" + limit + "&api_key=" + apiKey;
//console.log(fullUrl);

var parkDict = [];
function Park(parkCode, name, lat, long) {
	this.parkCode = parkCode;
	this.name = name;
	this.lat = lat;
	this.long = long;
	this.dist = dist(lat, long, zipLat, zipLong);
}

// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()
// Open a new connection, using the GET request on the URL endpoint
request.open('GET', fullUrl, true)
request.onload = function () {
  // Begin accessing JSON data here
  var json = JSON.parse(this.response);
  var data = json["data"];
  //console.log(data);
   
  // store parks info
  for (var i = 0; i < data.length; i++) {
  	var park = data[i];
  	if(park.designation == "National Park" || park.fullName.includes("National Park")){
  		var ll = park.latLong;
  		var temp = ll.split(",");
  		var lat = temp[0].split(":")[1];
  		var long = temp[1].split(":")[1];
  		//console.log(lat);
  		//console.log(long);
  		parkObj = new Park(park.parkCode, park.fullName, lat, long);
  		//console.log(parkObj);
  		parkDict.push(parkObj);
  	}
  }
  //console.log(parkDict);
  getClosestParks(parkDict);
  }
  // Send request
  request.send();
}

/////////////// Methods for finding closest parks ///////////////

function getClosestParks(list) {
	var ret = [];
	for(var i = 0; i < 20; i++){
		var ind = getMin(list);
		var park = list[ind];
		ret.push(list.splice(ind, 1)[0]);
	}
	ctr = 1;
	for(var i = 0; i < ret.length; i++) {
		var num = i+1;
		console.log(num + ": " + ret[i].name);
	}
	//console.log(ret);
	return ret;
}

function getMin(list) {
	var mindex = 0;
	for(var i = 0; i < list.length; i++) {
		//console.log("Element " + i + ": " + list[i].dist);
		if (list[i].dist < list[mindex].dist)
			mindex = i;
	}
	return mindex;
}

// returns straight-line distance between two points in km
function dist(lat1, lon1, lat2, lon2) {
      var conv = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = conv * c;
      return d;
    }

// Converts numeric degrees to radians
function toRad(value) {
        return value * Math.PI / 180;
}

function enterEvent(element){
	input.addEventListener("keyup", function(event) {
		// Number 13 is the "Enter" key on the keyboard
		if (event.keyCode === 13) {
		    // Trigger the button element with a click
		    document.getElementById("myBtn").click();
		}
	});
}