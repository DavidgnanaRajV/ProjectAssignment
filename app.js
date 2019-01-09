const express = require('express');
const bodyParser = require('body-parser');

const xml2js = require('xml2js');
const app = express();
const server = require('http').createServer(app);

const { getCall, postCall } = require('./CallRequests.js');
const report = require('./report.js');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  const method = 'GET';
  getCall().then(response => {
    const {body, statusCode} = response;
    report(method, statusCode, null, body, 'GetJsonFile.json');
    res.status(200).json({
      response
    })
  }).catch((error) => {
    report(method, 500, error, null, 'GetJsonFile.json');
    res.status(500).json({
      error
    })
  })
})

app.post('/postCall', (req, res) => {
  const method = 'POST';
  postCall(req.body, req.headers['Content-Type']).then(response => {
    const {body, statusCode} = response;
    report(method, statusCode, null, body, 'PostJsonFile.json');
    res.send(response);
  }).catch(error => {
    console.log("ERROR -POST", error)
    res.send(error);
  })
})

server.listen(8000);
console.log('App running on port 8000...');
