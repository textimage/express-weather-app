
async function loadWeather(loc) {
    const URL = `/weather?address=${loc}`
    const response = await fetch(URL)
    if(response.error) {
        return response.error
    }
    if(response.status != 200) {
        return {error: `StatusCode ${response.status}`}
    }

    const data = await response.json()
    return data
}

// loadWeather()

const weatherForm = document.querySelector('form')
const weatherInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const location = weatherInput.value
    if(!location.trim()) {
        messageOne.textContent = 'Empty location'
        return
    }

    messageOne.textContent = 'Loading'
    messageTwo.textContent = ''
    
    const weatherData = await loadWeather(location)
    if(weatherData.error) {
        messageOne.textContent = weatherData.error
        messageTwo.textContent = ''
    }else {
        messageOne.textContent = weatherData.location
        messageTwo.textContent = weatherData.forecast
    }
})