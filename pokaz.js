const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://saint:praca@cluster0-iip04.mongodb.net/test?retryWrites=true&w=majority"


exports.pokazSprawy = function (res, q, qdata) {
  var result;
  console.log('Tablica');
  MongoClient.connect(uri, function(err, db) {
    if (err) throw err;
    var dbo = db.db("saint");
    var query = { aktywny: 1 };
    dbo.collection("dash").find(query).toArray(function(err, result) {
      if (err) throw err;
      //console.log(result);
      for (x in result) {
        console.log(result[x].obiekt);
        console.log(result[x].msg);
      } 
      db.close();
    });
  });
  res.Write(result[0].msg);
};
