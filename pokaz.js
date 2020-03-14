const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://saint:praca@cluster0-iip04.mongodb.net/test?retryWrites=true&w=majority"


exports.pokazSprawy = function (res, q, qdata) {
  var wynik = [];
  console.log('Tablica');
  MongoClient.connect(uri, function(err, db, wynik) {
    if (err) throw err;
    var dbo = db.db("saint");
    var query = { aktywny: 1 };
    dbo.collection("dash").find(query).toArray(function(err, result, wynik) {
      if (err) throw err;
      //console.log(result);
      for (x in result) {
        console.log(result[x].obiekt);
        console.log(result[x].msg);
        wynik = result.slice();
      } 
      db.close();
    });
  });
  console.log(wynik[1].msg);
};
