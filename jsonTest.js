const fs = require('fs');
xml2js = require('xml2js');

fs.readFile('InputJsonFile.json', (err, data) => {
    if (err) throw err;
    let student = JSON.parse(data);
    console.log(student);
    var json = student;
    json.company[0].name = "Wipro Technologies"
    console.log(json);
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(json);
    fs.writeFile('OutputJsonFile.xml', xml, function(err, data)
    {
      if (err) console.log(err);
      console.log("successfully written our update xml to file");
    })
});
