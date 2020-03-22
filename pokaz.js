const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://saint:praca@cluster0-iip04.mongodb.net/test?retryWrites=true&w=majority"


exports.pokazSprawy = function (res, q, qdata) {
  console.log('Tablica');
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("saint");
    var query = { aktywny: 1 };
    var wynik = dbo.collection("dash").find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(wynik.length); 
        db.close();
    });
    
  });
  
  console.log(wynik.length + "poza");  
  //printjson (wynik[0]);
};
