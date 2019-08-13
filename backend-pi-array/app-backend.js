/*
npm init -y
npm i express
npm install generate-pi
npm i thread-sleep

//Backend Pi Service on Port 90

*/

const generatePi = require('generate-pi');
//const sleep = require('sleep')
var sleep = require('thread-sleep');
const express = require('express')
const app = express()
var port = process.argv[2] || 90
app.use(express.json())
var piDigits = 11

app.post('/pi', (req,res) => {
    console.log(req.body)
    piDigits=req.body.piDigits
    piDigits = parseInt(piDigits, 0);
    console.log(piDigits)
    
    var piValue = generatePi.get(piDigits);
    console.log(piValue)
    
    //const piValue=piDigits*200
    
            
        var Pi=0;
        var n=1;
        var i = 1
        var imax = piDigits
        for (i=0;i<=imax;i++)
        {
        Pi=Pi+(4/n)-(4/(n+2))
        n=n+4
        }
        console.log(Pi)
        
        
        var arr = [];
        for (var i=0, t=piDigits-1; i<t; i++) {
          arr.push(Math.round(Math.random() * t))
        }
        
       // console.log(arr)
        var sumArray = 0
        
        var x=0;
        while (x!=piDigits-1){
            sumArray = sumArray + arr[x]
           // console.log(arr[x])
        
        x++
        ;
        
        }
        var randomWait
        randomWait = Math.random()*1000
        console.log('Random Wait : '+randomWait)
        
        randomWait = parseInt(randomWait+1, 0);
       // sleep.msleep(randomWait)
        var resleep = sleep(randomWait);
        
    console.log('Sum of Array :'+sumArray)
    //console.log("The value of x is : "+x);
    resultPiArray = {
        piValue,
        sumArray,
        randomWait
    }
    //res.send('Result of pi calculations : '+piValue+)
    res.send(resultPiArray)
})


app.listen(port,() => {
    console.log('Backend Server Pi Array is up on port: '+port)
})





/* Original Sample Web App 
var http = require('http');

//create a server object:
http.createServer(function (req, res) {
    console.log('Starting Simple Web Server Backend Pi Array')
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8082); //the server object listens on port 8080

*/
