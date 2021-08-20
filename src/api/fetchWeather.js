import axios from 'axios'

const API_KEY = '9d23c9c5fb2660865dd02c9c1910a2ba'
const URL = 'https://api.openweathermap.org/data/2.5/weather'
// const dailyURL = 'https://api.openweathermap.org/data/2.5/onecall'
const excludes = 'current,minutely,hourly,alerts'

//?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}

export const fetchWeather = async (query) => {
    const { data } = await axios.get(URL, {
        params:{
            q: query,
            units: 'metric',
            APPID: API_KEY,
        }
    })

    return data
}

export const dailyData = async (ddata) => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${ddata.coord.lat}&lon=${ddata.coord.lon}&exclude=${excludes}&units=metric&appid=${API_KEY}`)

    return data
}

// export const dailyData = async (lat, lon) => {
//     const { data } = await axios.get(dailyURL, {
//         params: {
//             lat,
//             lon,
//             exclude: excludes,
//             units: 'metric',
//             APPID: API_KEY
//         }
//     })

//     return data
// }
