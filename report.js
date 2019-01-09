const fs = require('fs');

module.exports = (method, statusCode, error, data, fileName) => {
  const jsonData = JSON.stringify({
    method,
    statusCode,
    error: null,
    data,
  }, null, 2);
  fs.writeFile(fileName, jsonData, function(err)
  {
    if (err) throw err;
    console.log("successfully written our update json to file");
  })
}
