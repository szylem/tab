var http = require('http');
var url = require('url');
var fs = require('fs');
var add = require('./dodaj.js');
var edit = require('./edycja.js');
var show = require('./pokaz.js');
const PORT = process.env.PORT || 3000;

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var filename = "." + q.pathname;
  var qdata = q.query;
  
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    } 
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    if (q.pathname == '/dodaj.html'){
        add.dodajSprawe(res, q, qdata);
        return res.end();
    } else if (q.pathname == '/edycja.html'){
        edit.edytujSprawy(res, q, qdata);
        setTimeout(function(){ 
        return res.end();        
        }, 3000);
    } else if (q.pathname == '/pokaz.html'){
        show.pokazSprawy(res, q, qdata);
        setTimeout(function(){ 
        return res.end();        
        }, 3000);
    } else {
        return res.end();
    }
  });
  

  
}).listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
