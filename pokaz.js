const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://saint:praca@cluster0-iip04.mongodb.net/test?retryWrites=true&w=majority"


exports.pokazSprawy = function (res, q, qdata) {
  console.log('Tablica');
  var wyniki = [];
  MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
      if (err) throw err;
      var dbo = client.db("saint");
      var query = { aktywny: 1 };
      var cursor = dbo.collection("dash").find(query);
      dbo.collection("dash").find(query).toArray(function(err, result) {
          if (err) throw err;
          console.log("Wyniki z bazy");
          console.log(result[0].obiekt);
          //wyniki[0] = result[0].obiekt;
          //console.log(wyniki[0]);
          for(let i = 0; i < result.lenght; i++){
            wyniki.push(result[i].obiekt);
          }
          client.close();
      });
  });
  
  setTimeout(function(){ 
    console.log("Połączenie zakończone");
    console.log(wyniki[0]);
    console.log(wyniki[1]);
    //res.write(wyniki);
  }, 3000);
    
  
};
