var http = require('http'),
fs = require('fs'),
parseString = require('xml2js').parseString,
xml2js = require('xml2js'),
json;
http.createServer(function (req, res) {
  fs.readFile('Input.xml', function(err, data) {
    parseString(data, function(err, result){
      if(err) console.log(err);
        json = result;
        json.root.node[0].name = "Wipro Technologies";
    });
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(json);
    fs.writeFile('Output.xml', xml , function (err) {
      if (err)
       throw err;
       console.log("successfully written our update to file");
  });
});

}).listen(8080);
