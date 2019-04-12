var express = require('express');

var app = express();

var MongoClient = require('mongodb').MongoClient;
var names;

//var url = "mongodb://coral_username:coral_password@cluster0-4dk4s.mongodb.net/test";
// var url = "mongodb://localhost:27017/";
const uri = "mongodb+srv://coral_username:coral_password@cluster0-yvnv5.mongodb.net/test?retryWrites=true";

var str="";
var json = [];
var parks = [];
var campgrounds=[];
var visitorCenters=[];



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

  var server = app.listen(8080, function() {}); 

var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

 app.get('/', function(req, res) {
                res.sendFile(__dirname + '/index.html');
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

    console.log("Connected");
    
    
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