const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://saint:praca@cluster0-iip04.mongodb.net/test?retryWrites=true&w=majority"
var wynik;

exports.pokazSprawy = function (res, q, qdata) {
  console.log('Tablica');
  MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
    if (err) throw err;
      var dbo = client.db("saint");
      var query = { aktywny: 1 };
      dbo.collection("dash").find(query).then((docs) => {
        console.log(docs);
        
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        client.close();
      });
  });
  
  console.log(wynik + "  poza");  
  
};
