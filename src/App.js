import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import moment from 'moment'
import DailyWeatherCard from './components/DailyWeatherCard'

import { fetchWeather, dailyData } from './api/fetchWeather'
// import './App.css'

const useStyles = makeStyles((theme) => ({  
    centerItems: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            paddingTop: theme.spacing(3)
        }
    },
    centerItemss: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            paddingTop: theme.spacing(3)
        }
    },
    mainContainer: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
           
        }
    }
}))

const App = () => {
    const classes = useStyles()

    const [query, setQuery] = useState('')
    const [weather, setWeather] = useState({})
    const [loading, setLoading] = useState(true)
    const [dailyWeather, setDailyWeather] = useState({})



    const search = async (e) => {   
        setLoading(true)    
        if(e.key === 'Enter') {
            const data = await fetchWeather(query)

            setWeather(data)
            setQuery('')
            const ddata = await dailyData(data)
            setDailyWeather(ddata)

            console.log(ddata)
            console.log(data)
            setLoading(false)
            
        }
    }



    
    return (
        <Container maxWidth="lg" disableGutters className={classes.mainContainer}>
            <Grid container >
                <Grid container item md={6} className={classes.centerItems}>
                    <div>
                        <TextField label='Enter Country' onChange={e => setQuery(e.target.value)} 
                            onKeyPress={search}/>
                    </div>
                    {weather.main && (
                        <div className={classes.centerItems}>                        
                            <Typography variant='h4' align="center">{moment().format('ddd, MMMM Do YYYY')}</Typography>
                            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt={weather.weather[0].description} />
                            <Typography variant="h3" align="center">{Math.round(weather.main.temp)}<sup>&deg;C</sup></Typography>
                            <Typography variant="h3">{weather.weather[0].main}</Typography>
                            <Typography variant="h3">{weather.name}, {weather.sys.country}</Typography>
                            
                        </div>
                    )}
                    
                </Grid>
                <Grid container
                    item 
                    md={6} 
                    direction="column"
                    className={classes.centerItems}>
                    <Grid item className={classes.centerItemss} xs={12}>
                        {weather && 
                        <DailyWeatherCard dailyWeather={dailyWeather} loading={loading} />
                        }
                        
                    </Grid>
                </Grid>
            </Grid>
        </Container>

    )
}

export default App
