function myFunction() {


//gets zipcode text
var zipcode = document.getElementById("zipInput").value;
console.log(zipcode);


//list all the parks
var park = "";
var limit = "600"; 

 // complete the url
var endpoint = "https://developer.nps.gov/api/v1/parks?parkCode=";
var apiKey = "nL3ttK1D6ACPakfdXuHtFVwqZoUqBUNakkT4mqZ6";
var fullUrl = endpoint + park + "&limit=" + limit + "&api_key=" + apiKey;
console.log(fullUrl);


// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()
// Open a new connection, using the GET request on the URL endpoint
request.open('GET', fullUrl, true)
request.onload = function () {
  // Begin accessing JSON data here

  var json = JSON.parse(this.response)

  var data = json["data"]
  var firstObject = data[1]


  console.log(firstObject.name)

  }

// Send request
request.send()


}