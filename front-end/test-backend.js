  /* works 
  curl -X POST -H "Content-Type: application/json" --data '{"piDigits":500}' http://localhost:8083/pi
  */
  
const piDigits = 20
var dataj = {"piDigits": piDigits};
const URLPiArray = 'http://localhost:8083/pi'
var request = require('request');
var EventEmitter = require("events").EventEmitter;
var body = new EventEmitter();

let options = {
  url: URLPiArray,
  method: "POST",
  headers: {
    "content-type": "application/json"
  },
  json: {"piDigits": piDigits}
};


 request(options,
  function(err, res, data) {
   // console.log('err', err) // <---- never prints any thing from here!
   // console.log('res', res)
   // console.log('data', data)
      if (!err && res.statusCode == 200) {
        //console.log(data);
        //console.log(res)
            body.data = data;
            body.emit('update');
      }

  }
  
)

body.on('update', function () {
    console.log(body.data); 
});




/*
const geoPiArray = (piDigits, callback) => {
    const data = {
        lat : 0,
        long : 0
    }
    return data
}

const data = geoPiArray('apple')
console.log(data)

*/

/*
const ValuepiArray = request.post( URLPiArray, { json: {"piDigits": piDigits} },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
         console.log((body))
         return body
        }
    }
)

*/
//console.log(ValuepiArray)

            /*
    ValuepiArray = request.post(
    URLPiArray,
    { json: {"piDigits": piDigits} },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
         console.log((body))
            
        }
    }
)
            */
            