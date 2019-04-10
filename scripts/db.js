var MongoClient = require('mongodb').MongoClient;

var names;

//var url = "mongodb://coral_username:coral_password@cluster0-4dk4s.mongodb.net/test";
// var url = "mongodb://localhost:27017/";
const uri = "mongodb+srv://coral_username:coral_password@cluster0-yvnv5.mongodb.net/test?retryWrites=true";

MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;

  var database = db.db("coral");
  var collection = database.collection("newParks");

// console.log(database);
//   database.collection('newCampgrounds').find().toArray(function(err, docs) {
//       console.log(JSON.stringify(docs));
//   });


  collection.find({}, { name: 1}).toArray(function(err, result) {
    if (err) 
      throw err;

    console.log("Connected");
    
    var length = result.length;

    var i;

    for(i=0; i<length; i++){


      console.log(i);
      console.log(result[i].fullName);


      var table = document.getElementById('parkTable');

      var row = table.insertRow(0);
      var cell1 = row.insertCell(0);
      cell1.innerHTML = result[i].fullName;



      
    }
    
    
    
    db.close();
  });
});
