var humidity;
var weatherIcon;
var uvIndex;
var temperature;
var windSpeed;
var weatherSummary;
var precipitationProb;

var lat ;
var long ;


window.onload = function() {
  setTimeout(function(){
   console.log("wait");
   humidity = document.getElementById("humidity");
  weatherIcon = document.getElementById("icon-desc");
 
  uvIndex = document.getElementById("uvIndex");
  temperature = document.getElementById("weather-temperature");
  
  
  windSpeed = document.getElementById("windSpeed");
  weatherSummary = document.getElementById("weather-summary");
  precipitationProb = document.getElementById("preciProb");
  lat = parseFloat(document.getElementById('Latitude').innerHTML);
  long = parseFloat(document.getElementById('Longitude').innerHTML);
  showWeather(lat, long);
 }, 3000);
  
}



function humidityPercentage(h) {
  return Math.round(h * 100);
}





var weatherImages = {
  "clear-day": "wi-day-sunny",
  "clear-night": "wi-night-clear",
  "rain": "wi-rain",
  "snow":"wi-snow",
  "sleet": "wi-sleet",
  "wind": "wi-strong-wind",
  "fog": "wi-fog",
  "cloudy": "wi-cloudy",
  "partly-cloudy-day": "wi-day-cloudy",
  "partly-cloudy-night": "wi-night-alt-cloudy",
  "hail": "wi-hail",
  "thunderstorm": "wi-thunderstorm",
  "tornado": "wi-tornado"
}


    
     
       
   

 
  function showWeather(lat, long) {
    var url = `https://api.darksky.net/forecast/d4a00494c75b80ab1d0c88c6938232d3/${lat},${long}` + `?format=jsonp&callback=displayWeather`;
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
    //displayWeather(object)   
  }

var object;

 function displayWeather(object) {
    humidity.innerHTML = humidityPercentage(object.currently.humidity) + "%";
    weatherIcon.classList.add(weatherImages[object.currently.icon]);
  
    uvIndex.innerHTML =  object.currently.uvIndex;
    temperature.innerHTML = object.currently.temperature + '<i class="wi wi-fahrenheit"></i>';

   precipitationProb.innerHTML=object.currently.precipProbability+"%";
   
    windSpeed.innerHTML = object.currently.windSpeed+" mph";
    weatherSummary.innerHTML =  object.currently.summary;
      
    console.log(object);
 }


