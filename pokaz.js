const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://saint:praca@cluster0-iip04.mongodb.net/test?retryWrites=true&w=majority"
var wynik;

exports.pokazSprawy = function (res, q, qdata) {
  
  console.log('Tablica');
  MongoClient.connect(uri, function(err, db) {
      if(err) {
        console.log(err);
        process.exit(0);
      }
      var dbo = db.db("saint");
      var query = { aktywny: 1 };
      var collection = dbo.collection("dash");
      collection.find(query).toArray((err, result) => {
        if(err) {
            console.log(err);
            process.exit(0);
        }
        console.log(result.length);
        wynik = result[0].obiekt;
        db.close();
      });
    
  });
  
  //console.log(result.length + "poza");  
  //printjson (wynik[0]);
};
