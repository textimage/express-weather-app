const request = require('postman-request')
const WEATHER_API_KEY = '645dc29a3ac1081564b08280e3c4780a'


function forecast(latitude, longitude, callback) {
    const URL = `http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${latitude},${longitude}`
    request({url: URL, json: true}, (err, res, body) => {
        if(err) {
            callback("Unable to connect to weather services")
        } else if(res.statusCode !== 200) {
            callback("Server send unexpected response")
        } else if(body.success === false) {
            callback(body.error.info)
        } else {
            const { temperature, feelslike, weather_descriptions, humidity } = body.current
            const weatherForecast = `current temperature is ${temperature} degress out, it feel likes ${feelslike} degress out.Today is ${weather_descriptions[0]}, humidity is ${humidity}%`
            callback(null, weatherForecast)
        }
    })
}

module.exports = forecast