const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://saint:praca@cluster0-iip04.mongodb.net/test?retryWrites=true&w=majority"


exports.pokazSprawy = function (res, q, qdata) {
  console.log('Tablica');
  
  MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
      if (err) throw err;
      var dbo = client.db("saint");
      var query = { aktywny: 1 };
      var cursor = dbo.collection("dash").find(query);
      dbo.collection("dash").find(query).toArray(function(err, result) {
          if (err) throw err;
          console.log("Wyniki z bazy");
          client.close();
      });
  });
  
  setTimeout(function(){ console.log("Połączenie zakończone"); }, 3000);
    
  
};
