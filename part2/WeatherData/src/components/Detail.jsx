import axios from 'axios'
import { useState ,useEffect} from 'react';

const Detail = ({ searchList }) => {
    const api_key = import.meta.env.VITE_SOME_KEY
    const [weatherData,setWeatherData] = useState({})
   
   
    const country = searchList[0];
    console.log('searchList',searchList)
    useEffect(()=>{
     axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&APPID=${api_key}&units=metric`
        ).then(response =>{
            const data =  {
                temp : response.data.main.temp,
            weather :response.data.weather[0].icon,
            wind : response.data.wind.speed
            }
            setWeatherData(data)

        })
    },[country.capital])
    
    const languages = country.languages;
    const flag = country.flags;

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>{country.capital}</p>
            <p>{country.area}</p>
            <h2>Languages</h2>
            <ul>
                {languages &&
                    Object.entries(languages).map(([key, value]) => (
                        <li key={key}>{value}</li>
                    ))}
            </ul>
            <div>
                <img src={flag.png} alt={flag.alt} />
            </div>
            <h2>Weather in {country.capital}</h2>
            <p>Temperature {weatherData.temp} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather}@2x.png`} alt="weather image" />
            <p>Winds {weatherData.wind} m/s</p>

        </div>
    );
};
export default Detail;