const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://saint:praca@cluster0-iip04.mongodb.net/test?retryWrites=true&w=majority"


exports.pokazSprawy = function (res, q, qdata) {
  var wynik;
  console.log('Tablica');
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("saint");
    var query = { aktywny: 1 };
    wynik = dbo.collection("dash").find(query).toArray(function(err, result) {
      if (err) throw err;
      //console.log(result);
      for (x in result) {
        //console.log(result[x].obiekt);
        //console.log(result[x].msg);
      } 
      db.close();
    });
    console.log(printjson (wynik[0]));
  });
  //res.write(wynik[0].msg);
};
