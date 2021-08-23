const express = require('express')
const app = express()
const hbs = require('hbs')
const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

// Define paths for Express config

// Setup handlbars and view path
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        body: 'Dolor ullamco veniam aute et voluptate anim veniam dolore. Sit ut pariatur dolor mollit do magna nostrud. Ex nulla consequat qui ea occaecat. Nulla velit esse id incididunt laboris occaecat proident tempor veniam dolor dolor labore. Non exercitation consequat et pariatur dolor incididunt nulla consequat esse ut esse cillum. Ea culpa proident sit irure est consequat fugiat officia.'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send( { error: '주소를 찾을 수 없습니다'})
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send( { error })
        }
        forecast(latitude, longitude, (error, weatherForecast) => {
            if(error) {
                return res.send( { error })
            }else {
                res.send({
                    forecast: weatherForecast,
                    location,
                    address: req.query.address
                })
            }
        })
    })

    
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help'
    })
})

app.get('/help/*', (req, res) => {
    res.status(404).render('404', {
        title: 'Help 404',
        errorMessage: '요청하신 도움말 페이지를 찾을 수 없습니다.'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})

app.get('*', (req, res) => {
    res.status(404).render('404', {
        title: '404',
        errorMessage: '요청하신 페이지를 찾을 수 없습니다.'
    })
})

app.listen(port, () => console.log('Server startd!'))