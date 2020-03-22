const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://saint:praca@cluster0-iip04.mongodb.net/test?retryWrites=true&w=majority"


exports.pokazSprawy = function (res, q, qdata) {
  var wynik = [];
  console.log('Tablica');
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("saint");
    var query = { aktywny: 1 };
    dbo.collection("dash").find(query).toArray(function(err, result) {
      if (err) throw err;
          
        console.log(result[0].obiekt);  
        wynik.push(result[0].obiekt);
        db.close();
    });
    
  });
  console.log(wynik.length);
  //printjson (wynik[0]);
};
