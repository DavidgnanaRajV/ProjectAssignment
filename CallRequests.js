const axios = require('axios');
const fs = require('fs');
const assert = require('assert');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const parseString = xml2js.parseString;

function callRequest(method, url, headers, data, timeout = 10000) {
  return new Promise((resolve, reject) => {
    return axios({
      method,
      url,
      headers,
      data,
      timeout,
    }).then((response) => {
      resolve({
        response: {
          body: response.data,
          statusCode: response.status,
        },
      });
    }).catch((error) => {
      if (error.response) {
        console.log(`SOAP FAIL: ${error}`);
        reject(error.response.data);
      } else {
        console.log(`SOAP FAIL: ${error}`);
        reject(error);
      }
    });
  });
};

// usage of module
const soapCall = async () => {
  const url = 'http://www.example.org';
  const headers = {
    'Content-Type': 'application/soap+xml; charset=utf-8',
  };
  const xml = fs.readFileSync('soapFile.xml', 'utf-8');
  try {
    const { response } = await callRequest('post', url, headers, xml);
    const { body, statusCode } = response;
    console.log('BODY', body);
    console.log('STATUS CODE', statusCode);
    assert(statusCode === 200, "Status code verification Failed!!!")

    parseString(body, function(err, result){
          if(err) console.log(err);
          const json = result;
          // var testvalue = json.html.head.title.nodevalue
          console.log('nodevalue', json.html.head[0].title[0]);
          assert(json.html.head[0].title[0] === 'Example Domain', "Node verification Failed!!!")

    });

  } catch(err) {
    console.log("ERROR OCCURED - SOAP", err);
  }
};

const getCall = () => {
  return new Promise((resolve, reject) => {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
      callRequest('get', url).then(response => {
        const { body, statusCode } = response.response; // const body = response.body, const statusCode = response.statusCode
        resolve({body, statusCode});
        console.log('User ID:',body.userId);
        console.log('Status Code:',statusCode);
        assert(statusCode === 200, "Status code verification Failed!!!")
        assert(body.userId === 1, "User ID verification Failed!!!")
      }).catch(err => {
        console.log("ERROR OCCURED - GET", err);
        reject(err);
      });
  })
}

const postCall = (bodyData, headers) => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  return new Promise((resolve, reject) => {
    callRequest('post',url,headers,bodyData).then(response => {
      const { body, statusCode } = response.response; // const body = response.body, const statusCode = response.statusCode
      const { id } = body; // const userId = body.userId
      console.log("POST RESPONSE", response);
      console.log('User ID:',id);
      resolve({body, statusCode});
      assert(statusCode === 201, "Status code verification Failed!!!")
      assert(body.id === 101, "User ID verification Failed!!!")
    }).catch((err) => {
      console.log("ERROR OCCURED - POST", err);
      reject(err);
    });
  })
}

module.exports = {
  getCall,
  postCall
}
 // soapCall();
// getCall();
// postCall();
