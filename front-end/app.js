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

const webServerPort = process.argv[2] || 80
//console.log(__dirname)          //prints directory name and file name below
//console.log(__filename)
//console.log(path.join(__dirname, 'public'))         //can append .. to go back.. 
const app = express()

//Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, 'public')
const viewsPath = path.join(__dirname,'templates/views')
const partialsPath = path.join(__dirname,'templates/partials')
const geocode = require('./src/utils/geocode')
const forecast = require('./src/utils/forecast')
const awsParamStore = require( 'aws-param-store' )
 
const fs = require('fs')
const weatherUnits = 'si'
const weatherLanguage='en'


//Setup Handle Bars Engine and Views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)           //set the path for views folder to be something else than 'views'
hbs.registerPartials(partialsPath)


//Setup Static Static Directory to serve
app.use(express.static(publicDirectoryPath))         //needs path to server where index.html is stored.. 
//if app.use is provided, and has index.html, that file is used

app.get('', (req,res) =>  {
    res.render('index',{
        title: 'Weather App',
        name: 'Vijay'
    })                 //uses Handlebar.. points to index.hbs
})


app.get('/help', (req,res) =>  {
    res.render('help', {
        title: 'Help Page',
        helpText: 'This is some helpful Text',
        name: 'Vijay'
    })     
})              


app.get('/about', (req,res) =>  {
    res.render('about',{
        title: 'About Page',
        name: 'Vijay'
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
        name: 'Vijay'

    })     
    //errorMessage: 'Generic Global Error'
})

app.get('*', (req,res) => {     //* = match anything not matched so far
    //res.send('My 404 Page')
    res.render('404',{
        title: 'Error!!! Page Not Found',
        errorMessage: 'Generic Global Error',
        name: 'Vijay'

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