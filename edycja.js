const MongoClient = require('mongodb').MongoClient;
const MongoClient2 = require('mongodb').MongoClient;
const uri = "mongodb+srv://saint:praca@cluster0-iip04.mongodb.net/test?retryWrites=true&w=majority"


exports.edytujSprawy = function (res, q, qdata) {
  console.log('Edycja');
// szykowanie rozwijanej listy elementów z bazy
  var obiekty = [];
  var msg = [];
  var id = [];
  MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
      if (err) throw err;
      var dbo = client.db("saint");
      var query = { aktywny: 1 };
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
  res.write('<div class="container p-5 my-5 bg-dark text-white">');
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
    res.write('<button type="submit" class="usun-button">Usuń</button></form>');
    res.write('</div></div></body></html>');
//aktywne elementy zostały wyświetlone
  }, 2000);
  //Jeśli jakiś element jest do usunięcia  
    if(q.search != null){
      MongoClient2.connect(uri, { useUnifiedTopology: true }, function(err, client) {
        if (err) throw err;
        var dbo = client.db("saint");
        var id = 'ObjectId("' + qdata.usun + '")';
        var query = { _id: { $in: [ id ] } };
        var newvalues = { $set: { aktywny: 0 } };
        dbo.collection("dash").updateOne(query, newvalues, function(err, result) {
          if (err) throw err;
          console.log("Zmiana statusu na nieaktywny");
          console.log(id);
          client.close();
        });
      });
    //zakończona modyfikacja w bazie
      res.write('<br>');
      res.write('<div class="alert alert-danger">');
      res.write('<strong>Pozycja została usunięta! </strong>');
      res.write('Jeśli chcesz cofnąć tą operację skontaktuj się z administratorem bazy.');
      res.write('</div>'); 
    }
};
