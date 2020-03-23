const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://saint:praca@cluster0-iip04.mongodb.net/test?retryWrites=true&w=majority"
var wynik;

exports.pokazSprawy = function (res, q, qdata) {
  console.log('Tablica');
  var resultArray = [];
  MongoClient.connect(uri, { useUnifiedTopology: true }, function(err, client) {
      if (err) throw err;
      var dbo = client.db("saint");
      var query = { aktywny: 1 };
      var cursor = dbo.collection("dash").find(query);
      cursor.forEach(function(doc, err){
        if (err) throw err;
        resultArray.push(doc);
      }, function(){
      client.close();
      //I have no index file to render, so I print the result to console
      //Also send back the JSON string bare through the channel
      //console.log(resultArray);
      //res.send(resultArray);
      });
  });
  
  //while(resultArray.lenght == 0) { console.log("czekam.."); };
  console.log(resultArray.lenght);  
  
};
