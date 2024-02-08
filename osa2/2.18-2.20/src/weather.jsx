import React, { useEffect, useState } from 'react';
import server from './services/server';

const Weather = (props) => {

    const [weather, setWeather] = useState(null)
    const api_key = import.meta.env.VITE_SOME_KEY
    // const api_key = "" 
    useEffect(() => {
        if (!props.city) return;
        server.getAll(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${props.city}&aqi=no`)
            .then(response => { 
                setWeather(response.data);
            })
    }, [props.city]);

    return(
        <div>
            <h1>Weather in {props.city}</h1>
            {weather && (
                <div>
                    <b>Temperature:</b> {weather.current.temp_c} Celsius<br />
                    <img src={weather.current.condition.icon} style={{width: 100}} />
                    <p>Last updated: {weather.current.last_updated}</p>
                </div>
            )}
        </div>
    )
}

export default Weather;