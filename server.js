var http = require('http');
var url = require('url');
var qs = require('querystring');
var processRequest = function(req, callback){
  var body = '';
  req.on('data', function(data){
    body += data;
  });
  req.on('end', function() {
    callback(qs.parse(body));
  });
}
var controller = function(req, res) {
  var message = '';
  switch(req.method) {
    case 'GET': message = "That's a GET"; break;
    case 'POST': message = "That's a POST"; break;
    case 'PUT':
      processRequest(req, function(data){
        message = "That's a PUT. You are editing " + data.book + " book.";
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(message + "\n");
      });
      return;
    break;
    case 'DELETE': message = "That's a delete"; break;
  }
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(message + '\n');
}

http.createServer(controller).listen(1337);
console.log('Server running at http://localhost:1337')