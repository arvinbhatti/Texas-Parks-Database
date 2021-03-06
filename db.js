var express = require('express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var path = require('path');
var app = express();

app.set('views', './public');
app.set('view engine', 'pug');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));



var names;



const server = app.listen(8080, () => {
  const host = server.address().address;
  const port = server.address().port;
  mapInit();

  console.log(`Example app listening at http://${host}:${port}`);
});
//var url = "mongodb://coral_username:coral_password@cluster0-4dk4s.mongodb.net/test";
// var url = "mongodb://localhost:27017/";
const uri = "mongodb+srv://coral_username:coral_password@cluster0-yvnv5.mongodb.net/test?retryWrites=true";

var str="";
var json = [];
var parks = [];
var campgrounds=[];
var visitorCenters=[];
var allParks=[];

var latLongMap = new Map();

var mapInit = function() {
  MongoClient.connect(uri,{useNewUrlParser:true}, function(err, db){
    var database = db.db('coral');
    var cursor = database.collection('newParks').find();
    cursor.forEach(function(doc){
        var parkCode = doc.parkCode;
        var obj = doc.latLong;
        var latLong = parseLoc(obj);
        latLongMap.set(parkCode, latLong);
    });
    db.close();
  });
}

app.route('/json').get(function(req, res)

    {

        MongoClient.connect(uri,{ useNewUrlParser: true },  function(err, db) {

            var database = db.db("coral");
            var cursor = database.collection('newParks').find();


            //noinspection JSDeprecatedSymbols
            cursor.limit(5).each(function(err, item) {

                if (item != null) {
                    str = str + "    Park Name  " + item.fullName + "</br>";

                    var object = {
                      "fullName" : item.fullName,
                      "latLong" : item.latLong,
                      "parkCode" : item.parkCode,
                      "address" : item.addresses
                    };
                    /*
                    object.push(item.fullName);
                    object.push(item.latLong);
                    object.push(item.parkCode);
                    */

                    parks.push(object);
                    //sconsole.log(parks);
                }
            });

            cursor = database.collection('newCampgrounds').find();
            cursor.limit(5).each(function(err, item){
              if(item!=null){
                //console.log(item);
                //console.log(item.name);
                var object = {
                "name" : item.name,
                "address" : item.addresses
                };

                campgrounds.push(object);
              }

            });


            cursor = database.collection('newVisitorCenters').find();
            cursor.limit(5).each(function(err, item){
              if(item!=null){
                var object = {
                "name" : item.name,
                "address" : item.addresses
                };
                visitorCenters.push(object);
              }

            });
            var collections =[];
            collections.push(parks);
            collections.push(campgrounds);
            collections.push(visitorCenters);
           // res.send(json);
            //res.send(str);
            //console.log(models);
           // console.log(collections);
            res.json(collections);
            db.close();
        });
    });



app.get('/test',(req,res)=>{
    //res.sendFile(__dirname +"/views/test.html",);
     MongoClient.connect(uri, function(err, db) {

            var database = db.db("coral");
            var cursor = database.collection('newParks').find();
            //noinspection JSDeprecatedSymbols
            cursor.each(function(err, item) {

                if (item != null) {
                    str = str + "    Employee id  " + item.fullName + "</br>";
                }
            });
           // res.send(str);
           res.json({test: "title", message: str});
            db.close();
        });
   // res.json({test:"title",message:"root"});
});

 app.get('/', function(req, res) {
                res.sendFile(__dirname + '/index.html');
            });



app.get('/parks',function(req,res){
  /* Need to complete park template*/
  var name = req.query.name;
 //  console.log(name);
   MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {

      var database = db.db("coral");
      var query = { fullName: name};
      var cursor = database.collection('newParks').find(query).toArray(function(err, result){
        if(err) throw err;
        //console.log(result[0].fullName);
        var fullName = result[0].fullName;
        var description = result[0].description;
        var phone = result[0].contacts.phoneNumbers[0].phoneNumber;
        if(result[0].contacts.emailAddresses[0].emailAddress){
          var email = result[0].contacts.emailAddresses[0].emailAddress;
        }
        var addresses = result[0].addresses;
        var address = "";
        for(var x in addresses){
        //  console.log(addresses[x].type);
          if(addresses[x].type =="Physical"){

            address=addresses[x].line1;

           var cityState="";
            cityState+=addresses[x].city;
            cityState+=", "
            cityState+=addresses[x].stateCode;
            cityState+=" ";
            cityState+=addresses[x].postalCode;
            break;
          }else{
            address = "unavailable";
          }
        }
        var directionsInfo="";
        if(result[0].directionsInfo){
           directionsInfo=result[0].directionsInfo;
        }
       var directionsUrl="";
       if(result[0].directionsUrl){
        directionsUrl=result[0].directionsUrl;
       }
       var weatherInfo="";
       if(result[0].weatherInfo){
        weatherInfo=result[0].weatherInfo;
       }
       var latLong="";
       var lat="";
       var lon="";
       if(result[0].latLong){
          latLong = result[0].latLong;
          var properties = latLong.split(', ');
          var obj = {};
          properties.forEach(function(property) {
             var i = property.split(':');
             obj[i[0]] = i[1];
          });
          lat=obj.lat;
          lon=obj.long;
       }
       /*
       var images=[];
      if(result[0].images.length > 0 || result[0].images != undefined){
        images=result[0].images;
      }
      */
      var image="";
      if(result[0].images ==undefined){
        image = "https://www.alterenterprise.com/wp-content/uploads/2014/02/Image-not-available_1.jpg";
      }else if(result[0].images[0] == undefined){
        image = "https://www.alterenterprise.com/wp-content/uploads/2014/02/Image-not-available_1.jpg";
      }else{
        image=result[0].images[0].url;
      }
      /*
      if(result[0].images.length > 0 || result[0].images != undefined){
        image=result[0].images[0].url;
      }*/
      //console.log(image);
      //console.log(images);
        /* Left off here, need to finish getting all info for template */
       // console.log(address);
        res.render('park', { title: fullName,
          description: description,
          phoneNumber: phone,
          email: email,
          address: address,
          cityState: cityState,
          directionsInfo: directionsInfo,
          directionsUrl: directionsUrl,
          weatherInfo: weatherInfo,
          lat: lat,
          lon: lon,
          images: image
        });
        db.close();
      });


  });

  // res.sendFile(__dirname+'/public/park.html');
 // res.render('park', { title: 'Hey'});
  //res.send("Park!");
});

app.get('/campgrounds', function(req,res){
  /*Need to complete campground template*/
   var name = req.query.name;
  // console.log(name);
   MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {

      var database = db.db("coral");
      var query = { name: name};
      var cursor = database.collection('newCampgrounds').find(query).toArray(function(err, result){
        if(err) throw err;
        //console.log(result[0].fullName);
        var fullName = result[0].name;
        var description = result[0].description;
        var phone="unavailable";
       // console.log(result[0].contacts.phoneNumbers);

        if(result[0].contacts.phoneNumbers[0] != undefined ){
         // console.log("yay");
          phone = result[0].contacts.phoneNumbers[0].phoneNumber;
        }

        var email="unavailable";

        if(result[0].contacts.emailAddresses[0] != undefined ){
          email = result[0].contacts.emailAddresses[0].emailAddress;
        }


        var addresses = result[0].addresses;
        var address = "unavailable";
        if(result[0].addresses != undefined){
        for(var x in addresses){
         // console.log(addresses[x].type);
          if(addresses[x].type =="Physical"){

            address=addresses[x].line1;

           var cityState="";
            cityState+=addresses[x].city;
            cityState+=", "
            cityState+=addresses[x].stateCode;
            cityState+=" ";
            cityState+=addresses[x].postalCode;
            break;
          }else{
            address = "unavailable";
          }
        }
      }
        var directionsInfo="";
        if(result[0].directionsInfo){
           directionsInfo=result[0].directionsInfo;
        }
       var directionsUrl="";
       if(result[0].directionsUrl){
        directionsUrl=result[0].directionsUrl;
       }

       var monday="";
       var Tuesday="";
       var Wednesday="";
       var Thursday="";
       var Friday="";
       var Saturday="";
       var Sunday="";
       if(result[0].operatingHours != undefined){
        if(result[0].operatingHours[0].standardHours != undefined){
          monday=result[0].operatingHours[0].standardHours.monday;
          Tuesday=result[0].operatingHours[0].standardHours.tuesday;
          Wednesday=result[0].operatingHours[0].standardHours.wednesday;
          Thursday=result[0].operatingHours[0].standardHours.thursday;
          Friday=result[0].operatingHours[0].standardHours.friday;
          Saturday=result[0].operatingHours[0].standardHours.saturday;
          Sunday=result[0].operatingHours[0].standardHours.sunday;

        }
       }
       var totalsites="";
       if(result[0].campsites != undefined){
        if(result[0].campsites.totalsites){
          totalsites=result[0].campsites.totalsites;
        }
       }
       var parkCode=result[0].parkCode;
       //console.log(parkCode);
       var latLong="";

       var lat="";
       var lon="";

       var q = { parkCode: parkCode};
      var cursor2 = database.collection('newParks').find(q).toArray(function(err, result2){
        latLong=result2[0].latLong;
        //console.log(latLong);
      });
     // console.log(latLong);
       if(latLong!=""){

          var properties = latLong.split(', ');
          var obj = {};
          properties.forEach(function(property) {
             var i = property.split(':');
             obj[i[0]] = i[1];
          });
          lat=obj.lat;
          lon=obj.long;
       }


       /*
       var images=[];
      if(result[0].images.length > 0 || result[0].images != undefined){
        images=result[0].images;
      }
      */
      //console.log(images);
        /* Left off here, need to finish getting all info for template */
       // console.log(address);
        res.render('campground', { title: fullName,
          description: description,
          phoneNumber: phone,
          email: email,
          address: address,
          cityState: cityState,
          directionsInfo: directionsInfo,
          directionsUrl: directionsUrl,
          lat: lat,
          lon: lon,
          monday: monday,
          tuesday: Tuesday,
          wednesday: Wednesday,
          thursday: Thursday,
          friday: Friday,
          saturday: Saturday,
          sunday: Sunday,
          totalsites: totalsites,
          parkCode
        });
        db.close();
      });


  });
  //res.sendFile(__dirname + '/public/campsite.html');
  //res.send("Campground!");
});

app.get('/visitorCenters', function(req,res){
  /*Need to complete Visitor Center template*/
 var name = req.query.name;
  // console.log(name);
   MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {

      var database = db.db("coral");
      var query = { name: name};
      var cursor = database.collection('newVisitorCenters').find(query).toArray(function(err, result){
        if(err) throw err;
        //console.log(result[0].fullName);
        var fullName = result[0].name;
        var description = result[0].description;
        var phone="unavailable";
        if(result[0].contacts.phoneNumbers != undefined){
          if(result[0].contacts.phoneNumbers[0] != undefined){
            phone = result[0].contacts.phoneNumbers[0].phoneNumber;
          }

        }
        var email="";
        if(result[0].contacts.emailAddresses !=undefined){
          if(result[0].contacts.emailAddresses[0] != undefined){
          email = result[0].contacts.emailAddresses[0].emailAddress;
        }
        }

        var addresses = result[0].addresses;
        var address = "unavailable";
        if(result[0].addresses != undefined){
        for(var x in addresses){
         // console.log(addresses[x].type);
          if(addresses[x].type =="Physical"){

            address=addresses[x].line1;

           var cityState="";
            cityState+=addresses[x].city;
            cityState+=", "
            cityState+=addresses[x].stateCode;
            cityState+=" ";
            cityState+=addresses[x].postalCode;
            break;
          }else{
            address = "unavailable";
          }
        }
      }
        var directionsInfo="";
        if(result[0].directionsInfo){
           directionsInfo=result[0].directionsInfo;
        }
       var directionsUrl="";
       if(result[0].directionsUrl){
        directionsUrl=result[0].directionsUrl;
       }

       var monday="";
       var Tuesday="";
       var Wednesday="";
       var Thursday="";
       var Friday="";
       var Saturday="";
       var Sunday="";
       if(result[0].operatingHours != undefined){
        if(result[0].operatingHours[0].standardHours != undefined){
          monday=result[0].operatingHours[0].standardHours.monday;
          Tuesday=result[0].operatingHours[0].standardHours.tuesday;
          Wednesday=result[0].operatingHours[0].standardHours.wednesday;
          Thursday=result[0].operatingHours[0].standardHours.thursday;
          Friday=result[0].operatingHours[0].standardHours.friday;
          Saturday=result[0].operatingHours[0].standardHours.saturday;
          Sunday=result[0].operatingHours[0].standardHours.sunday;

        }
       }

       var parkCode=result[0].parkCode;
      // console.log(parkCode);
       var latLong="";

       var lat="";
       var lon="";
       /*
       var q = { parkCode: parkCode};
      var cursor2 = database.collection('newParks').find(q.toArray(function(err, result2){
        latLong=result2[0].latLong;
      }));
       if(result[0].latLong){
          latLong = result[0].latLong;
          var properties = latLong.split(', ');
          var obj = {};
          properties.forEach(function(property) {
             var i = property.split(':');
             obj[i[0]] = i[1];
          });
          lat=obj.lat;
          lon=obj.long;
       }
       */
       /*
       var images=[];
      if(result[0].images.length > 0 || result[0].images != undefined){
        images=result[0].images;
      }
      */
      //console.log(images);
        /* Left off here, need to finish getting all info for template */
       // console.log(address);
        res.render('visitorCenter', { title: fullName,
          description: description,
          phoneNumber: phone,
          email: email,
          address: address,
          cityState: cityState,
          directionsInfo: directionsInfo,
          directionsUrl: directionsUrl,
          lat: lat,
          lon: lon,
          monday: monday,
          tuesday: Tuesday,
          wednesday: Wednesday,
          thursday: Thursday,
          friday: Friday,
          saturday: Saturday,
          sunday: Sunday,
          parkCode
        });
        db.close();
      });


  });
  // res.sendFile(__dirname + '/public/visitorCenter.html');
  //res.send("Visitor Center!");
});

app.get('/allParks', function(req,res){

  //allParks=[];
  MongoClient.connect(uri,{ useNewUrlParser: true },  function(err, db) {

            var database = db.db("coral");
            var cursor = database.collection('newParks').find({}).toArray(function(err,result){
              if (err) throw err;
              //console.log(result);
              res.send(result);
              db.close();
            });

  });

         //   console.log(allParks);
  //res.json(allParks);
});

app.get('/allCampgrounds', function(req,res){
  MongoClient.connect(uri,{ useNewUrlParser: true },  function(err, db) {

            var database = db.db("coral");
            var cursor = database.collection('newCampgrounds').find({}).toArray(function(err,result){
              if (err) throw err;
             // console.log(result);
              res.send(cleanCampgrounds(result));
              db.close();

            });

  });

  //res.send('AllCampgrounds');
});

app.get('/allVisitorCenters', function(req,res){
  MongoClient.connect(uri,{ useNewUrlParser: true },  function(err, db) {

            var database = db.db("coral");
            var cursor = database.collection('newVisitorCenters').find({}).toArray(function(err,result){
              if (err) throw err;
             // console.log(result);
              res.send(cleanVisitorCenters(result));
              db.close();

            });

  });

  //res.send('AllVisitorCenters');
});


var request = require('request');


function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}


// JASON AND SIMON

app.get('/campupdate', function(req,res){

workinglUrl = "https://developer.nps.gov/api/v1/campgrounds?stateCode=TX&fields=contacts,addresses,fees,operatingHours&api_key=YHWbuaOPiRFh3aG80BSRzcJkLDybMOzGA46AFNvM";

parkURL = "https://developer.nps.gov/api/v1/parks?stateCode=AZ,NM,TX,OK,AR,LA,MS,AL&fields=addresses,contacts,entranceFees,entrancePasses,images,operatingHours&limit=150&api_key=DBgfvTCTyzeiSfBUVAVsgm46tT5jI2InC4N9h1om";
campURL = "https://developer.nps.gov/api/v1/campgrounds?stateCode=AZ,NM,TX,OK,AR,LA,MS,AL&fields=contacts,addresses,fees,operatingHours&limit=150&api_key=DBgfvTCTyzeiSfBUVAVsgm46tT5jI2InC4N9h1om";
vistorURL = "https://developer.nps.gov/api/v1/visitorcenters?stateCode=AZ,NM,TX,OK,AR,LA,MS,AL&fields=addresses,contacts,operatingHours&limit=150&api_key=DBgfvTCTyzeiSfBUVAVsgm46tT5jI2InC4N9h1om";


var data;

request(parkURL, function (error, response, body) {

      res.send(body);
      data = JSON.parse(body); //WORKING JSON


MongoClient.connect(uri,{ useNewUrlParser: true },  function(err, db) {

              var database = db.db("coral");
              //var myobj = { name: "Park", address: "BLEH" };
              database.collection('newParks').remove();
              database.collection('newParks').insert(data.data, function(err, res) {
                if (err) throw err;

                console.log("Parks Updated");

                 });

            // var cursor = database.collection('ArvinTest').find({}).toArray(function(err,result){ //print out db
            //   if (err) throw err;
            //  console.log(result);
            //   });

      db.close();
  });
  });

request(campURL, function (error, response, body) {

      data = JSON.parse(body); //WORKING JSON


MongoClient.connect(uri,{ useNewUrlParser: true },  function(err, db) {

              var database = db.db("coral");
              database.collection('newCampgrounds').remove();
              database.collection('newCampgrounds').insert(data.data, function(err, res) {
                if (err) throw err;

                console.log("Camps Updated");

                 });


      db.close();
  });
  });

request(vistorURL, function (error, response, body) {

      data = JSON.parse(body); //WORKING JSON


MongoClient.connect(uri,{ useNewUrlParser: true },  function(err, db) {

              var database = db.db("coral");
              database.collection('newVisitorCenters').remove();
              database.collection('newVisitorCenters').insert(data.data, function(err, res) {
                if (err) throw err;

                console.log("VC Updated");

                 });

      db.close();
  });
  });
});



app.get('/pushdb', function(req,res){

MongoClient.connect(uri,{ useNewUrlParser: true },  function(err, db) {

              var database = db.db("coral");
              var myobj = { name: "Park", address: "BLEH" };


              database.collection('SimonTest').insertOne(myobj, function(err, res) {
                if (err) throw err;

                console.log("1 document inserted");

                 });

            var cursor = database.collection('SimonTest').find({}).toArray(function(err,result){
              if (err) throw err;
             console.log(result);
             res.send(result);


              });

      db.close();
  });

});




app.get('/getLatLong', function(req,res){
  //console.log(req.query);
    var parkCode = req.query.parkCode;
    //console.log(parkCode);
   MongoClient.connect(uri,{ useNewUrlParser: true },  function(err, db) {

            var database = db.db("coral");
            var cursor = database.collection('newParks').find({parkCode: parkCode}).toArray(function(err,result){
              if (err) throw err;
              //console.log(result[0]);
              res.send(result);

            });

      db.close();
  });
});




var request = require('request');

app.post('/findZip', function(req,res){
  //res.send('You sent the zipcode "' + req.body.zipInput + '".');


    var zip = req.body.zipInput;
    console.log("Zip:" + zip);

    var zipKey = "4Enuwr1rKc4dzu85H65Ic92HHQe258pzqqSh38Se5dEwR8l52vqnSqB7TmzQctt4/";
        var zipEndpoint = "https://www.zipcodeapi.com/rest/";
        var zipType = "json";
        var zipUnits = "degrees";
        var zipLat = 30.230455;
        var zipLong = 97.713943;

    var zipUrl = zipEndpoint + zipKey + "info." + zipType + "/" + zip + "/" + zipUnits;

    console.log("Zip URL:" + zipUrl);


    request(zipUrl, function (error, response, body) {
          console.log('error:', error); // Print the error if one occurred and handle it
          console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
          res.send(body);

          console.log(body);
          var data = JSON.parse(body);
          console.log("Data: " + data);

          zipLat = data.lat;
          zipLong = data.lng;

          console.log("LATTTTT:    " + zipLat);
          console.log("LONGGGG:    " + zipLong);
    });

  console.log(req.body);
});

//var server = app.listen(8080, function() {});


app.get('/getImages', function(req,res){
  var parkCode = req.query.parkCode;
    //console.log(parkCode);
   MongoClient.connect(uri,{ useNewUrlParser: true },  function(err, db) {
            if(err) throw err;

            var database = db.db("coral");
            var cursor = database.collection('newParks').find({parkCode: parkCode}).toArray(function(err,result){
              if (err) throw err;
              //console.log(result[0]);
              res.send(result);

            });

      db.close();
  });
})

var cleanStanton = function(list) {
  var remList = [];
  var start;
  for(var i = 0; i < list.length; i++) {
    if(list[i].name.includes("Stanton")) {
      start = i;
      break;
    }
  }
  for(var j = 5; j > 0; j--) {
    list.splice(start+j, 1);
  }
  return list;
}

var listRemDup = function(list) {
  var remList = [];
  for(var i = 0; i < list.length-1; i++) {
    var next = i+1;
    if(list[i].name == list[next].name) {
      remList.push(next);
      i++;
    }
  }
  remList.sort(function(a,b){
    if(a < b) return 1;
    if(a > b) return -1;
    return 0;
  });
  for(var i = 0; i < remList.length; i++) {
    //console.log(list[remList[i]]);
    list.splice(remList[i], 1);
  }
  return list;
}

const Math = require('mathjs')
var request = require('request');

//var constructSinglePark = function();

var dist = function(loc) {
  var conv = 6371; // km
  var res;

  var dLat = (loc.lat2-loc.lat1) * Math.PI / 180;
  var dLon = (loc.lon2-loc.lon1) * Math.PI / 180;
  var lat1 = (loc.lat1) * Math.PI / 180;
  var lat2 = (loc.lat2) * Math.PI / 180;

  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
  Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  res = conv * c;
  return res;
}

var parseLoc = function(latLong) {
  var properties = latLong.split(', ');
  var obj = {};
  properties.forEach(function(property) {
     var i = property.split(':');
     obj[i[0]] = i[1];
  });
  return obj;
}

var doParks = function(package) {
  var latLong = package.latLong;
  var res = package.res;
  var zip = package.zip;

  var list = [];
  var sema = 0;
  var zipLat = latLong.lat;
  var zipLong = latLong.long;
  MongoClient.connect(uri, {useNewUrlParser: true}, function(err, db){
    if(err) throw err;
    var database = db.db('coral');
    var cursor = database.collection('newParks').find();
    cursor.forEach(function(doc){
      list.push(doc);
      var ctr = 1000;
      while(ctr){
        ctr--;
      }
      database.collection('newParks').countDocuments(function(err, count){
          if(count == list.length) {
              for(var i = 0; i < list.length; i++) {
                if(list[i].latLong == "") {
                  list.splice(i, 1);
                }
              }
              list.sort(function(a, b){
                  var aLatLong = a.latLong;
                  //console.log("aLatLong: " + a.latLong);
                  var bLatLong = b.latLong;

                  if(aLatLong == "" && bLatLong == "") return 0;
                  if(aLatLong == "") return 1;
                  if(bLatLong == "") return -1;

                  var aLatLong = parseLoc(aLatLong);
                  var bLatLong = parseLoc(bLatLong);

                  var aLoc = {
                    lat1: zipLat,
                    lon1: zipLong,
                    lat2: aLatLong.lat,
                    lon2: aLatLong.long
                  }

                  var bLoc = {
                    lat1: zipLat,
                    lon1: zipLong,
                    lat2: bLatLong.lat,
                    lon2: bLatLong.long
                  }

                  var distA = dist(aLoc);
                  //console.log(a.name + ": " + distA);
                  var distB = dist(bLoc);
                  //console.log(b.name + ": " + distB);
                  if(distA < distB) return -1;
                  if(distA > distB) return 1;
                  return 0;
              });
              list = listRemDup(list);
              if (!sema) {
                //res.send(JSON.stringify(list));
                 var listStr = JSON.stringify(list);
                res.render('searchResults', {data: listStr, zipCode: zip, type: "Park"});
                db.close();
                sema++;
                return;
              }
          }
      });
    });
  });

}

var listReady = function(list, count) {
  if(list.length != count) return false;
  for(var i = 0; i < list.length; i++) {
    if(!list[i].parkCode) return false;
  }
  return true;
}

var cleanCampgrounds = function(list) {
    //console.log("Cleaning Campgrounds...");
    //console.log(JSON.stringify(list));
    list = cleanStanton(list);
    list = listRemDup(list);
    //console.log("Removed Duplicates...");
    var remIndices = [];
    list.forEach(function(campground){
      var name = campground.name;
      //console.log("Campground name: " + name);
      if(name === "No Campgrounds"
        || name === "Camping Alternatives"
        || name === "Campground 1"
        || name === "No developed campgrounds in the preserve") {
        remIndices.push(list.indexOf(campground));
      }
    });
    remIndices.sort(function(a,b){
      if(a < b) return 1;
      if(a > b) return -1;
      return 0;
    });
    //console.log(remIndices);
    remIndices.forEach(function(index){
      //console.log("index: " + index);
      //console.log(list[index]);
      //console.log("Removing " + list[index].name + " from list...");
      list.splice(index, 1);
    });
    //console.log("Removed bad names... returning");
    return list;
}

var doCampgrounds = function(package) {
  var latLong = package.latLong;
  var res = package.res;
  var zip = package.zip;

  var sema = 0;
  var list = [];
  var zipLat = latLong.lat;
  var zipLong = latLong.long;
  MongoClient.connect(uri, {useNewUrlParser: true}, function(err, db){
    if(err) throw err;
    var database = db.db('coral');
    var cursor = database.collection('newCampgrounds').find();
    cursor.forEach(function(doc){
        list.push(doc);
        var ctr = 1000;
        while(ctr){
          ctr--;
        }
        database.collection('newCampgrounds').countDocuments(function(err, count){
          if(err) throw err;
          if(listReady(list, count)) {
            list.sort(function(a,b){
              //console.log(a.name + " park code: " + a.parkCode);
              //console.log(b.name + " park code: " + b.parkCode);
              var aLatLong = latLongMap.get(a.parkCode);
              var bLatLong = latLongMap.get(b.parkCode);

              if(aLatLong == null && bLatLong == null){
                return 0;
              }
              if(aLatLong == null){
                return 1;
              }
              if(bLatLong == null){
                return -1;
              }

              var aLat = aLatLong.lat;
              //console.log("aLat: " + aLat);
              var aLong = aLatLong.long;
              var bLat = bLatLong.lat;
              //console.log("bLat: " + bLat);
              var bLong = bLatLong.long;

              var aLoc = {
                lat1:zipLat,
                lon1:zipLong,
                lat2:aLatLong.lat,
                lon2:aLatLong.long
              }

              var bLoc = {
                lat1:zipLat,
                lon1:zipLong,
                lat2:bLatLong.lat,
                lon2:bLatLong.long
              }

              var aDist = dist(aLoc);
              //console.log(a.name + ": " + aDist);
              var bDist = dist(bLoc);
              //console.log(b.name + ": " + bDist);

              if(aDist < bDist) return -1;
              if(aDist > bDist) return 1;
              return 0;
            });
            list = cleanCampgrounds(list);
            if(!sema){
             // res.send(JSON.stringify(list));
              var listStr = JSON.stringify(list);
             res.render('searchResults', {data: listStr, zipCode: zip, type: "Campground"});
             db.close();
              sema++;
              return;
            }
          }
        });
    });
  });
}

var cleanVisitorCenters= function(list) {
    list = listRemDup(list);
    list.forEach(function(visitorCenter){
      var name = visitorCenter.name;
      var badName = "No Visitor Center, Roads, Signs, or Facilities of any sort";
      if(name == badName) {
        list.splice(list.indexOf(visitorCenter), 1);
      }
    });
    return list;
}

var doVisitorCenters = function(package){
  var latLong = package.latLong;
  var res = package.res;
  var zip = package.zip;

  var sema = 0;
  var list = [];
  var zipLat = latLong.lat;
  var zipLong = latLong.long;
  MongoClient.connect(uri, {useNewUrlParser: true}, function(err, db){
    if(err) throw err;
    var database = db.db('coral');
    var cursor = database.collection('newVisitorCenters').find();
    cursor.forEach(function(doc){
        list.push(doc);
        //console.log(list);
        var ctr = 1000;
        while(ctr){
          ctr--;
        }
        database.collection('newVisitorCenters').countDocuments(function(err, count){
          if(err) throw err;
          //console.log(list);
          if(listReady(list, count)) {
            if(sema) return;
            //console.log("sorting");
            list.sort(function(a,b){
              //console.log(a.name + " park code: " + a.parkCode);
              //console.log(b.name + " park code: " + b.parkCode);
              var aLatLong = latLongMap.get(a.parkCode);
              var bLatLong = latLongMap.get(b.parkCode);

              if(aLatLong == null && bLatLong == null){
                return 0;
              }
              if(aLatLong == null){
                return 1;
              }
              if(bLatLong == null){
                return -1;
              }

              var aLat = aLatLong.lat;
              //console.log("aLat: " + aLat);
              var aLong = aLatLong.long;
              var bLat = bLatLong.lat;
              //console.log("bLat: " + bLat);
              var bLong = bLatLong.long;

              var aLoc = {
                lat1: zipLat,
                lon1: zipLong,
                lat2: aLatLong.lat,
                lon2: aLatLong.long
              }

              var bLoc = {
                lat1: zipLat,
                lon1: zipLong,
                lat2: bLatLong.lat,
                lon2: bLatLong.long
              }

              var aDist = dist(aLoc);
              //console.log(a.name + ": " + aDist);
              var bDist = dist(bLoc);
              //console.log(b.name + ": " + bDist);

              if(aDist < bDist) return -1;
              if(aDist > bDist) return 1;
              return 0;
            });
            list = cleanVisitorCenters(list);
            if(!sema){
              //console.log(list);
             // res.send(JSON.stringify(list));
             var listStr = JSON.stringify(list);
             res.render('searchResults', {data: listStr, zipCode: zip, type: "VisitorCenter"});
             db.close();
              sema++;
              return;
            }
          }
        });
    });
  });
}


app.get('/button', function(req, res) {
                res.sendFile(__dirname + '/button.html');
            });



app.get('/otherbutton', function(req, res) {




workinglUrl = "https://developer.nps.gov/api/v1/campgrounds?stateCode=TX&fields=contacts,addresses,fees,operatingHours&api_key=YHWbuaOPiRFh3aG80BSRzcJkLDybMOzGA46AFNvM";

parkURL = "https://developer.nps.gov/api/v1/parks?stateCode=AZ,NM,TX,OK,AR,LA,MS,AL&fields=addresses,contacts,entranceFees,entrancePasses,images,operatingHours&limit=150&api_key=teDSdB3Aafbicbq0X40z25cOcQmmq1qPU05QQXDq";
campURL = "https://developer.nps.gov/api/v1/campgrounds?stateCode=AZ,NM,TX,OK,AR,LA,MS,AL&fields=contacts,addresses,fees,operatingHours&limit=150&api_key=teDSdB3Aafbicbq0X40z25cOcQmmq1qPU05QQXDq";
vistorURL = "https://developer.nps.gov/api/v1/visitorcenters?stateCode=AZ,NM,TX,OK,AR,LA,MS,AL&fields=addresses,contacts,operatingHours&limit=150&api_key=teDSdB3Aafbicbq0X40z25cOcQmmq1qPU05QQXDq";


var data;

request(parkURL, function (error, response, body) {

      //res.send(body);
      data = JSON.parse(body); //WORKING JSON


MongoClient.connect(uri,{ useNewUrlParser: true },  function(err, db) {

              var database = db.db("coral");
              //var myobj = { name: "Park", address: "BLEH" };
              database.collection('newParks').remove();
              database.collection('newParks').insert(data.data, function(err, res) {
                if (err) throw err;

                console.log("Parks Updated");

                 });

            // var cursor = database.collection('ArvinTest').find({}).toArray(function(err,result){ //print out db
            //   if (err) throw err;
            //  console.log(result);
            //   });

      db.close();
  });
  });

request(campURL, function (error, response, body) {

      data = JSON.parse(body); //WORKING JSON


MongoClient.connect(uri,{ useNewUrlParser: true },  function(err, db) {

              var database = db.db("coral");
              database.collection('newCampgrounds').remove();
              database.collection('newCampgrounds').insert(data.data, function(err, res) {
                if (err) throw err;

                console.log("Camps Updated");

                 });


      db.close();
  });
  });

request(vistorURL, function (error, response, body) {

      data = JSON.parse(body); //WORKING JSON


MongoClient.connect(uri,{ useNewUrlParser: true },  function(err, db) {

              var database = db.db("coral");
              database.collection('newVisitorCenters').remove();
              database.collection('newVisitorCenters').insert(data.data, function(err, res) {
                if (err) throw err;

                console.log("VC Updated");

                 });

      db.close();
  });
  });


                res.redirect("index.html");
            });

app.post('/search', function(req, res){
  var zip = req.body.zipInput;
  var model = req.body.model;
  //console.log("model: "+model);
  var zipKey = "4Enuwr1rKc4dzu85H65Ic92HHQe258pzqqSh38Se5dEwR8l52vqnSqB7TmzQctt4/";
  var zipEndpoint = "https://www.zipcodeapi.com/rest/";
  var zipType = "json";
  var zipUnits = "degrees";
  var zipLat;
  var zipLong;

  var zipUrl = zipEndpoint + zipKey + "info." + zipType + "/" + zip + "/" + zipUnits;

  var sema = 0;

  /* TODO handle bad zip input */
  request(zipUrl, function (error, response, body) {
        //console.log('error:', error); // Print the error if one occurred and handle it
        //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        if (response.statusCode != 200) {
          console.log("zip api request failed");
          //return;
          res.send("Please Enter a valid Zip Code!");
        }
        //res.send(body);

        //console.log(body);
        var data = JSON.parse(body);
        var obj = {lat:data.lat, long:data.lng};

        var package = {
          latLong:obj,
          res:res,
          zip:zip
        }

        if(model == "parks") doParks(package);
        else if(model == "campgrounds") doCampgrounds(package);
        else if(model == "visitorCenters") doVisitorCenters(package);
        else res.send("Please Select a model to search!");

  });
});






// MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
//   if (err) throw err;

//   var database = db.db("coral");
//   var collection = database.collection("newParks");


// console.log(database);
//   database.collection('newCampgrounds').find().toArray(function(err, docs) {
//       console.log(JSON.stringify(docs));
//   });


  // collection.find({}, { name: 1}).toArray(function(err, result) {
  //   if (err)
  //     throw err;

   // console.log("Connected");


  //   var length = result.length;

  //   var i;

  //   for(i=0; i<length; i++){


  //     console.log(i);
  //     console.log(result[i].fullName);
  //     console.log(result[i].url);


      // var table = document.getElementById('parkTable');

      // var row = table.insertRow(0);
      // var cell1 = row.insertCell(0);
      // cell1.innerHTML = result[i].fullName;




  //   }



  //   db.close();
  // });
// });
