
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoibG5heWNyayIsImEiOiJja3NiNTJnem8wM2VyMnBsN3hhdXV1YmlsIn0.3PRmwWuAR0h2Mxq3Yo7viA'
const request = require('postman-request')

function geocode(address, callback) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
    request({url, json: true}, (err, res, body) => {
        if(err){
            callback("Unable to connect to location services.")
        } else if(res.statusCode !== 200) {
            callback("Server send unexpected response")
        } else if(body.features.length == 0) {
            callback("Location can not found")
        } else {
            const data = body.features[0]
            callback(null, {
                latitude: data.geometry.coordinates[1],
                longitude: data.geometry.coordinates[0],
                location: data.place_name 
            })
        }
    })
}

module.exports = geocode