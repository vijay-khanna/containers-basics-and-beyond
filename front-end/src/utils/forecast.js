const URLPiArray = 'http://back-end-pi-array-service:90/pi'  
var urlMotm = `http://MOTMLBURL:91/motm`
const yargs = require('yargs')
const chalk = require('chalk')
var request = require('request');
var deasync = require("deasync")
var EventEmitter = require("events").EventEmitter;
var bodyem = new EventEmitter();
var sleep = require('thread-sleep');
//var sleep = require('sleep');
var globalresult = {}
          var piValue = 0
          var sumArray = 0
          var randomWait = 0
          var motm ='Be Happy'
          var resdata = 0
         var  piDigits=500


//var varpiArrayVal = 0

          const axios = require('axios')
          axios.post(URLPiArray, {"piDigits": piDigits})
            .then((res) => {
             // console.log(`statusCode: ${res.statusCode}`)
              //console.log(res.data)
              
            //  console.log('2. server response:' + res.data.unique)
              this.valid = res.data.unique
            //  console.log(res.data.piValue)
            //  console.log(res.data.sumArray)
            //  console.log(res.data.randomWait)
              piValue = res.data.piValue
              sumArray = res.data.sumArray
              randomWait = res.data.randomWait
              console.log(piValue, sumArray, randomWait)
              return res.data.unique;
              
              //return res.data;
            })
            .catch((error) => {
              console.error(error)
            });


//to get Message of the Moment
const axiosgetmotm = require('axios');


axiosgetmotm.get(urlMotm)
  .then(response => {
   // console.log(response.data.url);
    console.log(response.data.motm);
    motm = response.data.motm
    
  })
  .catch(error => {
    console.log(error);
  });
  
  




//const URLPiArray = 'http://back-end-pi-array-service:8083/pi'           // for Prod
         //for Cloud9

const forecast = (latitude, longitude, DarkSkyAPISecret, weatherUnits, weatherLanguage, callback) => {
//const darkSkyNetURLString = 'https://api.darksky.net/forecast/'+DarkSkyAPISecret+'/'+latitude+','+longitude+'?units='+weatherUnits+'&lang='+weatherLanguage
const url = 'https://api.darksky.net/forecast/'+DarkSkyAPISecret+'/'+latitude+','+longitude+'?units='+weatherUnits+'&lang='+weatherLanguage
    //const mapBoxForwardEncodingURLString = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token='+MapBoxAccessToken+'&limit=1'
    // encode will put %20 instead of Space. and manage special characters. 

    request({url, json : true },(error,{ body }) => {  
        if(error){
            callback('Unable to Connect to Weather Service DarkSkyNet API. Possibly Internet/Wifi Issue', undefined)
            console.log(chalk.red.inverse.bold('Unable to Connect to Weather Service DarkSkyNet API.. Possibly Internet connection/Wifi issue'))
    
        }else if (body.error) {
            callback('Unable to find Location in DarkSkyNet API, try another address', undefined)
            //console.log(chalk.red.inverse.bold('\n Unable to find Location in Darksky API'))
            }
       
        else{
           var  percentRainChance = (body.currently.precipProbability*100)
            percentRainChance = percentRainChance.toFixed(2)        //Limiting the Percent to 2 digits
            
         ///-->
         
          var piDigits = body.currently.temperature
          console.log(piDigits)

    /*      
          let options = {
          url: URLPiArray,
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          json: {"piDigits": piDigits}
          };
    
          request(options, function(err, res, data) {
              if (!err && res.statusCode == 200) {
                    bodyem.data = data;
                   // console.log(bodyem.data)
                    var varpiArrayVal = bodyem.data
                    console.log(varpiArrayVal)
                    bodyem.emit('update');
                    
              }
           }
          
        )
        
        */ 
        //...Just about good

    /*    
bodyem.on('update', function () {
  //  console.log(bodyem.data); 
})
*/
    
console.log(body.currently.summary+' It is Currently '+body.currently.temperature+' Celcius. There is a '+ percentRainChance+' Percent Chance of rain \n'+'Message of the Moment : '+motm+ '\n Pi Value : '+piValue +' sumArray '+sumArray+' randomWait '+randomWait)

callback(undefined, body.currently.summary+' It is Currently '+body.currently.temperature+' Celcius. There is a '+ percentRainChance+' Percent Chance of rain. \n ' +'Message of the Moment : '+ motm + ' sumArray : '+sumArray+' randomWait : '+randomWait +' \n Pi Value : '+piValue)
     
        //Check for Internet Connectivity Errors
        //console.log(response)
        //const data = JSON.parse(response.body)            //Removed this as we are not using json=true for direct JSON format output
        //console.log(response.body.currently.summary)         //Pulling Specific JSON Object Values. 
        
        //console.log(percentRainChance)
        
       //// console.log(chalk.yellow('\n Weather is '+response.body.currently.summary+'. \n'))
        //// console.log(chalk.green.inverse('It is Currently '+ response.body.currently.temperature+' degrees Celcius out there in '+response.body.timezone+' . \n'))
        //// console.log('There is a '+ percentRainChance+' percent chance of rain.\n' )
    }
       
    })
    
}
       
module.exports = forecast

// Below to be removed
/*
request({url: darkSkyNetURL, json : true },(error,response) => {     //json = true helps to have default output in JSON format.. so parsing is not required
    // *** either error or response will be there..
    //console.log(error)
    if(error){
        console.log(chalk.red.inverse.bold('Unable to Connect to Weather Service DarkSkyNet API.. Possibly Internet connection/Wifi issue'))

    }else if (response.body.error) {
        console.log(chalk.red.inverse.bold('\n Unable to find Location in Darksky API'))

    }
   
    else{
  
    //Check for Internet Connectivity Errors
    //console.log(response)
    //const data = JSON.parse(response.body)            //Removed this as we are not using json=true for direct JSON format output
    //console.log(response.body.currently.summary)         //Pulling Specific JSON Object Values. 
    percentRainChance = (response.body.currently.precipProbability*100)
    percentRainChance = percentRainChance.toFixed(2)        //Limiting the Percent to 2 digits
    //console.log(percentRainChance)
    
    console.log(chalk.yellow('\n Weather is '+response.body.currently.summary+'. \n'))
    console.log(chalk.green.inverse('It is Currently '+ response.body.currently.temperature+' degrees Celcius out there in '+response.body.timezone+' . \n'))
    console.log('There is a '+ percentRainChance+' percent chance of rain.\n' )
}
   
})

*/
