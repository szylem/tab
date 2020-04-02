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
            data[i] = result[i].dataUtworzenia;
          }
          client.close();
      });
  });
  res.write('<div class="container">');
  res.write('<p id="demo"></p>');
  setTimeout(function(){ 
    console.log("Połączenie zakończone");
    res.write('<table class="table table-striped">');
    res.write('<thead><tr><th>Lp.</th><th>Temat</th><th>Treść</th><th>Data utworzenia</th></tr></thead><tbody>');
    var j,lp = 1;
    for (j in obiekty){
      res.write('<tr>');
      res.write('<td>' + lp++ + '</td>');
      res.write('<td>' + obiekty[j] + '</td>');
      res.write('<td>' + msg[j] + '</td>');
      res.write('<td>' + data[j] + '</td>');
      res.write('</tr>');
    }
    res.write('</tr></tbody></table></div></body></html>');
  }, 2000);
};
