import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const api = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=19ec4cc550e53dd5055cc984efd954a9`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(api).then((response) => {
        setData(response.data)
      })
      setLocation('')
    }
  }
 const today = new Date(),
 curTime = today.getHours() +":"+ (today.getMinutes()<10?'0':'') + today.getMinutes()
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter city name'
          type="text" />
      </div>


      <div className="container">

        <div className="top">
          <div className='details'>
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed(0)}°C</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
            <div className="date">
              {data.weather !==undefined ? <p>{curTime}</p> : null}
            </div>
          </div>
          {data.name !== undefined &&
            <div className='extra-details'>
              <div className="feels">
                {data.main ? <p className='bold'> Feels Like {data.main.feels_like.toFixed()}°C</p> : null}
              </div>
              <div className="humidity">
                {data.main ? <p className='bold'>Humidity {data.main.humidity}%</p> : null}
              </div>
              <div className="wind">
                {data.wind ? <p className='bold'>Wind Speed {data.wind.speed.toFixed()} km/h</p> : null}            </div>
            </div>}
        </div>



        {data.name !== undefined &&
          <div className="bottom">

            <div className='long'>
              {data.main ? <p className='bold'>{data.coord.lon.toFixed(2)}°</p> : null}
              <p>Longitude</p>
            </div>
            <div className='lat'>
              {data.main ? <p className='bold'>{data.coord.lat.toFixed(2)}°</p> : null}
              <p>Latitude</p>
            </div>
            <div className='country'>
              {data.main ? <p className='bold'>{data.sys.country}</p> : null}
              <p>Country</p>
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App;



// {"coord":{"lon":47.5,"lat":40.5},
// "weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],
// "base":"stations",
// "main":{"temp":6.15,"feels_like":4.13,"temp_min":6.15,"temp_max":6.15,"pressure":1018,"humidity":63,"sea_level":1018,"grnd_level":1016},
// "visibility":10000,
// "wind":{"speed":2.67,"deg":281,"gust":4.01},
// "clouds":{"all":100},
// "dt":1671909736,
// "sys":{"type":1,"id":8844,"country":"AZ","sunrise":1671855067,"sunset":1671888456},
// "timezone":14400,
// "id":587116,
// "name":"Azerbaijan",
// "cod":200}

// {"cod":"404","message":"city not found"}