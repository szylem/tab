const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://saint:praca@cluster0-iip04.mongodb.net/test?retryWrites=true&w=majority"


exports.pokazSprawy = function (res, q, qdata) {
  console.log('Tablica');
  var obiekty = [];
  var msg = [];
  var data = [];
  MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
      if (err) throw err;
      var dbo = client.db("saint");
      var query = { aktywny: 1 };
      var cursor = dbo.collection("dash").find(query);
      dbo.collection("dash").find(query).toArray(function(err, result) {
          if (err) throw err;
          console.log("Wyniki z bazy");
          var i;
          for(i in result){
            obiekty[i] = result[i].obiekt;
            msg[i] = result[i].msg;
            data[i] = result[i]."data utworzenia";
          }
          client.close();
      });
  });
  res.write("przed timeout <br>");
  setTimeout(function(){ 
    console.log("Połączenie zakończone");
    var j;
    for (j in obiekty){
      res.write(obiekty[j] + " ");
      res.write(msg[j] + " ");
      res.write(data[j]);
    }
  }, 2000);
  res.write("po wszystkim <br>");  
  
};
