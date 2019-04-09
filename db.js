var MongoClient = require('mongodb').MongoClient;
var names;

//var url = "mongodb://coral_username:coral_password@cluster0-4dk4s.mongodb.net/test";
// var url = "mongodb://localhost:27017/";
const uri = "mongodb+srv://arvinbhatti@gmail.com:coral$123@cluster0-yvnv5.mongodb.net/test?retryWrites=true";

MongoClient.connect(uri, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;

  var dbo = db.db("plswork");

  dbo.collection("newCampgrounds").find({}, { projection: { _id: 0, name: 1, address: 1 } }).toArray(function(err, result) {
    if (err) 
      throw err;

    var length = result.length;

    var i;

    for(i=0; i<length; i++){

    	//names result[i].name

    	console.log(i);
    	console.log(result[i].name);


      
    }
    
    
    db.close();
  });
});


console.log(names);