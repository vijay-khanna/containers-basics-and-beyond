/*
Initialize first
npm init -y
npm i express
npm i chalk
npm i nodemon
npm i path
npm i handlebars
npm i hbs
npm i request
npm i events
npm i yargs
npm i fs
npm i aws-sdk
npm i aws-param-store
npm i node-fetch
npm i axios
npm i deasync
npm i aws-param-store
npm i date-and-time
npm i os

aws ssm get-parameters --names "/Params/keys/DarkSkyAPISecret"
aws ssm get-parameters --names "/Params/keys/MapBoxAccessToken"

read -p "Enter the DarkSkyAPISecret : " DarkSkyAPISecret ; echo "DarkSkyAPISecret :  "$DarkSkyAPISecret
aws ssm put-parameter --name "/Params/keys/DarkSkyAPISecret" --value $DarkSkyAPISecret --type String --overwrite

read -p "Enter the MapBoxAccessToken : " MapBoxAccessToken ; echo "MapBoxAccessToken :  "$MapBoxAccessToken
aws ssm put-parameter --name "/Params/keys/MapBoxAccessToken" --value $MapBoxAccessToken --type String --overwrite



>>> to restart Nodemon to restart even if .hbs file is saved.. by default it restarts only when .js file is saved
nodemon app.js -e js,hbs

nodemon .\app.js
try opening urls :
http://localhost:3000
http://localhost:3000/help

*/
const chalk = require('chalk')
const express = require('express')
const path = require('path')
const hbs = require('hbs')

const date = require('date-and-time');

const webServerPort = process.argv[2] || 80
//console.log(__dirname)          //prints directory name and file name below
//console.log(__filename)
//console.log(path.join(__dirname, 'public'))         //can append .. to go back..
const app = express()

//Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, 'public')
const viewsPath = path.join(__dirname,'templates/views')
const partialsPath = path.join(__dirname,'templates/partials')


var os = require('os');
var hostname = os.hostname();

const fs = require('fs')
const weatherUnits = 'si'
const weatherLanguage='en'

var msg = 'Hello World. This is a Welcome Message.....'
var ver = "v01"
var webPageColour = "Red"
var okResponse = JSON.parse('{ "status":"OK"}');


//Setup Handle Bars Engine and Views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)           //set the path for views folder to be something else than 'views'
hbs.registerPartials(partialsPath)


//Setup Static Static Directory to serve
app.use(express.static(publicDirectoryPath))         //needs path to server where index.html is stored..
//if app.use is provided, and has index.html, that file is used

app.get('/', (req,res) =>  {
  res.status(200)
  var msg1 = 'All is Well'
  res.send('All is Well')
    })                 //uses Handlebar.. points to index.hbs


app.get('/motm', (request, response) => {
  var motm_array =[]
  var rn_val = 1
  var min = 1
  var max= 5
  min = Math.ceil(min)
  max = Math.floor(max);
  
  
  rn_val = Math.floor(Math.random() * (max - min)) + min;
  
  motm_array[1] = 'This Too Shall Pass'
  motm_array[2] = 'Let go of the Illusion of Control.'
  motm_array[3] = 'Knowing others is intelligence; knowing yourself is true wisdom.'
  motm_array[4] = 'When you are content to be simply yourself and dont compare or compete, everyone will respect you..'
  motm_array[5] = 'Stop thinking, and end your problems. What difference between yes and no?'
  
  var motm_msg = rn_val+"-"+motm_array[rn_val]    
    
  response.send({motm:motm_msg})
})


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
  
  

  
  var rspString = {"Message": msg, "Version":ver,"TimeStamp":tsStr,"hostname" :hostname, "remoteIP":remoteIP, "appLatencyms":randomNumber,"webServerPort":webServerPort}
 
  console.log(rspString)
  response.status(200)
  response.send(rspString)
})





app.get('/help', (req,res) =>  {
    res.render('help', {
        title: 'Help Page',
        helpText: 'This is some helpful Text',
        name: 'Developer'
    })
})


app.get('/about', (req,res) =>  {
    res.render('about',{
        title: 'About Page',
        name: 'Developer'
    })                 //uses Handlebar.. points to index.hbs
})


/* run the below to check if address validation is working
http://localhost:3000/weather       //should give error
http://localhost:3000/weather?address=Bangalore
*/


app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an Address'
        })
    }


    //Pulling the Secret Key from AWS Parameter Store..
        // Enter Data using command as
          let DarkSkyAPISecret = awsParamStore.getParameterSync( '/Params/keys/DarkSkyAPISecret',{ region: 'us-east-1' } );
          //console.log(DarkSkyAPISecret.Value)
          let MapBoxAccessToken = awsParamStore.getParameterSync( '/Params/keys/MapBoxAccessToken',{ region: 'us-east-1' } );
          let FrontEndDNS = awsParamStore.getParameterSync( '/Params/keys/FrontEndDNS',{ region: 'us-east-1' } );


        geocode(req.query.address, MapBoxAccessToken.Value, (error, {latitude, longitude, location} = {} ) => {
            //{} gives default blank object in case no address is passed
            if (error){
                //return console.log(error)
                return res.send({error})
            }
            forecast(latitude, longitude, DarkSkyAPISecret.Value, weatherUnits, weatherLanguage, (error, forecastData)=> {
                if (error){
                    //return console.log(error)
                    return res.send({error})
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })
            })
        })





/*

    res.send({
        forecast: 'Snowing',
        temperature: '24',
        address: req.query.address
    })
*/

})


/*
//Try Query String .
http://localhost:3000/products?key=value
http://localhost:3000/products?search=games
http://localhost:3000/products?search=games&rating=5    //try this with console.log(req.query)
Try
http://localhost:3000/products
Above will give error : Search should be provided..
*/
app.get('/products', (req,res) => {
    if (!req.query.search){      //runs when search is not provided
            return res.send({       // return stops the function execution.. and doesn't run res.send twice
                error: 'Error, Please provide Search term'
            })
    }
    console.log(req.query.search)       //dump the web input parameters
    res.send({
        products:[{"games":"football","toys":"chess"}]

    })
})
// We get error : "Cannot set headers after they are sent to the client: if we send a http response twice.
// like res.send twice..






//404 page for malformed/non-existent urls.. Should be in the End, after all valid URL Evaluations.
app.get('/help/*', (req,res) => {     //* = match anything not matched so far
    res.render('404',{
        title: 'Error!!! Page Not Found',
        errorMessage: 'Help Article Not Found. ',
        name: 'Developer'

    })
    //errorMessage: 'Generic Global Error'
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


/*
//app.get('') will not  return now, as we have the default file as static index.html
//have put the static files for help, about hence removed the app.get for these
app.get('', (req,res) => {  // req = request : object containing information about incoming request to server
                            // response = what goes back to requestor
    //res.send('Hello World')
    res.send('<h1> Hello World </h1>')  //Only one res.send is allowed at a time, if we put two there will be error
})


app.get('/help', (req,res) => {
    //res.send('This is Help Page')
    res.send({
        name: 'Vijay',
        age: 23
    })

})

app.get('/about', (req,res) => {
    res.send('This is About Page')
})
*/


