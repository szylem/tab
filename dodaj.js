const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://saint:praca@cluster0-iip04.mongodb.net/test?retryWrites=true&w=majority"
var status = true;

exports.dodajSprawe = function (res, q, qdata) {
  console.log('Panel dodawania');
  if(q.search != null){
    console.log(qdata.obiekt);
    console.log("msg:" + qdata.msg);
    //połączenie z bazą
    MongoClient.connect(uri, function(err, db) {
      if (err) throw err;
      var dbo = db.db("saint");
      //składanie daty wpisu
      var d = new Date();
      var data = d.getFullYear() + "-";
      data += (((d.getMonth()+1) < 10) ? "0" + (d.getMonth()+1) : (d.getMonth()+1)) + "-";
      data += (d.getDate() < 10) ? "0" + d.getDate() : d.getDate();
      //tworzenie wpisu
      var myobj = { obiekt: qdata.obiekt, msg: qdata.msg , dataUtworzenia: data, aktywny: 1 };
      //dodanie wpisu
      dbo.collection("dash").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    
    });
    if (status) {
      res.write('<br>');
      res.write('<div class="alert alert-success">');
      res.write('<strong>Dodano do bazy! </strong>');
      res.write('Powinieneś już widzieć swoją sprawę na <a href="pokaz.html" class="alert-link">tablicy</a>.');
      res.write('</div>');
    } else {
      res.write('<br>');
      res.write('<div class="alert alert-danger">');
      res.write('<strong>Pozycja nie została dodana! </strong>');
      res.write('Nie udało się połączyć z bazą danych. <a href="#" class="alert-link">Zgłoś problem</a>.');
      res.write('</div>');
    } 
  }
};
