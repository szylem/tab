const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://saint:praca@cluster0-iip04.mongodb.net/test?retryWrites=true&w=majority"


exports.pokazSprawy = function (res, q, qdata) {
  console.log('Tablica');
  var wyniki = [];
  MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client, wyniki) {
      if (err) throw err;
      var dbo = client.db("saint");
      var query = { aktywny: 1 };
      var cursor = dbo.collection("dash").find(query);
      dbo.collection("dash").find(query).toArray(function(err, result) {
          if (err) throw err;
          console.log("Wyniki z bazy");
          console.log(result[0].obiekt);
          let wyniki = result.slice();
          console.log(wyniki.lenght);
          client.close();
      });
  });
  
  setTimeout(function(){ 
    console.log("Połączenie zakończone"); 
    console.log(wyniki.lenght); 
  }, 3000);
    
  
};
