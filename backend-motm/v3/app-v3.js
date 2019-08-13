/*
This is a Web Server which returns Message for the Moment
npm init -y
npm i express
npm i sleep

*/


const sleep = require('sleep')
const express = require('express')
const app = express()
var port = process.argv[2] || 91
app.use(express.json())


app.get('/motm', (request, response) => {
    
  response.send({motm:"v3 - The truth is not always beautiful, nor beautiful words the truth."})
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`MOTM server is listening on ${port}`)
})
