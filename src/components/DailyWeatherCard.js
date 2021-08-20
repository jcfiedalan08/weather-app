import React, { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    centerItems: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: theme.spacing(1)
        
    },
    centerDiv: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(1)
    }
    
}))


const DailyWeatherCard = ({ dailyWeather, loading }) => {
    const classes = useStyles()
    const [daily, setDaily] = useState({})
    
    
    

   useEffect(() => {
    setDaily(dailyWeather.daily)
    console.log(daily)
    //console.log(daily.filter((d, index) => index !== 7))
    


   }, [dailyWeather.daily, daily])


    return !loading ? (
            daily.filter((d, index) => index !== 0).map((d, index) => (
                <Paper key={index+1} className={classes.centerItems} xs={12} sm={12} md={12}>
                    <img src={`https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`} alt={d.weather[0].description}/>
                    <div className={classes.centerDiv}>
                        <Typography gutterBottom variant="h5" component="h2">
                        {Math.round(d.temp.day)}<sup>&deg;C</sup>
                        </Typography>
                        <Typography>
                            {moment().add({days: index+1}).format('ddd, MMM D')}
                        </Typography>
                    </div>
                    
                    
                </Paper>
            ))
        ) : <h1>Loading</h1>
       
    
}

export default DailyWeatherCard
