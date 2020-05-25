const chalk = require('chalk')
const express = require('express')
const path = require('path')
const date = require('date-and-time');
const webServerPort = process.argv[2] || 80
const app = express()
const publicDirectoryPath = path.join(__dirname, 'public')
var os = require('os');
var hostname = os.hostname();

const fs = require('fs')

var msg = 'Hello World. This is a Welcome Message.....'
var ver = "v01"
var webPageColour = "Red"
var okResponse = JSON.parse('{ "status":"OK"}');
var ContainerID = getRandomInt(5000, 9000)

app.use(express.static(publicDirectoryPath))         //needs path to server where index.html is stored..

app.get('/', (req,res) =>  {
  res.status(200)
  var msg1 = 'All is Well'
  res.send('All is Well')
    })                 //uses Handlebar.. points to index.hbs


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


app.get('/stats', (request, response) => {
  var randomNumber = getRandomInt(1, 200)
  var remoteIP =  request.connection.remoteAddress
  
  var waitTill = new Date(new Date().getTime() + randomNumber );
  while(waitTill > new Date()){}

  var now = new Date();
  var tsStr = date.format(now, 'YYYY-MM-DD HH:mm:ss');
  var rspString = {"Message": msg, "Version":ver,"TimeStamp":tsStr,"hostname" :hostname, "remoteIP":remoteIP, "appLatencyms":randomNumber, "webServerPort":webServerPort,"ContainerID" :ContainerID}
 
  console.log(rspString)
  response.status(200)
  response.send(rspString)
})



app.get('*', (req,res) => {     //* = match anything not matched so far
    //res.send('My 404 Page')
    res.render('404',{
        title: 'Error!!! Page Not Found',
        errorMessage: 'Generic Global Error',
        name: 'Developer'

    })
})



app.listen(webServerPort, () => {
    console.log(chalk.green.inverse.bold('Message for Admins only on console. Web Server is up and running on port : '+ webServerPort))
})            //start web server and listen to requests.. CTRL+C to Stop

