const request = require('request')

const geocode = (address, MapBoxAccessToken, callback) => {
    //const mapBoxForwardEncodingURLString = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token='+MapBoxAccessToken+'&limit=1'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token='+MapBoxAccessToken+'&limit=1'
    // encode will put %20 instead of Space. and manage special characters. 
    //request ({ url, json: true}, (error, response)=> {
    request ({ url, json: true}, (error, { body })=> {
       // console.log(body)
        if (error){
            callback('Unable to Connect to MapBox Location Services. Possibly Internet/Wifi Issue', undefined)
        // }else if (response.body.features.length ===0) {
        }else if (body.features.length ===0) {
            callback('Unable to find Location, try another address', undefined)
            
        }else {
            callback(undefined,{        //error is undefined here. data is object.
                   latitude: body.features[0].center[1],
                   longitude: body.features[0].center[0],
                   location: body.features[0].place_name
            })
        }

    })
}





module.exports =     geocode
   

