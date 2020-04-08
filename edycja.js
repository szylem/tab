const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://saint:praca@cluster0-iip04.mongodb.net/test?retryWrites=true&w=majority"


exports.edytujSprawy = function (res, q, qdata) {
  console.log('Edycja');
  var obiekty = [];
  var msg = [];
  var id = [];
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
            id[i] = result[i]._id;
          }
          client.close();
      });
  });
  res.write('<div class="container-fluid p-3 my-5 bg-dark text-white">');
  res.write('<div class="container bg-dark text-white">');
  setTimeout(function(){ 
    console.log("Połączenie zakończone");
    res.write('<form>');
    res.write('<label class="mr-sm-2" for="sel1">Wybierz element: </label>');
    res.write('<select class="form-control mr-sm-2" id="wybrany" name="usun">');
    var j,lp = 1;
    for (j in obiekty){
      res.write('<option value="' + id[j] + '">');
      res.write(lp++ + ". " + obiekty[j]);
      res.write('</option>');
    }
    res.write('</select>');
    res.write('<button type="submit" class="btn btn-danger">Usuń</button></form>');
    res.write('</div></div></body></html>');
  }, 2000);
};
