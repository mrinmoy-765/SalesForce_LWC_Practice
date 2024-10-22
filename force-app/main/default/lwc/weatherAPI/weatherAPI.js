import { LightningElement } from 'lwc';
import getWeather from '@salesforce/apex/WeatherAPI.getWeather';

export default class WeatherAPI extends LightningElement {

    city;
    condition;
    imageURL;
    windMph;
    windKph;
    windDegree;
    windDir;
    pressureMb;
    pressureIn;
    feelsLikeC;
    feelsLikeF;

    handleonChange(event){
        this.city = event.target.value;
    }

    buttonClick() {
        getWeather({ city: this.city })
        .then((response) => {
            console.log("###Response : " + response);
            let parsedData = JSON.parse(response);
            this.imageURL = parsedData.current.condition.icon;
            this.condition = parsedData.current.condition.text;
            this.windMph = parsedData.current.wind_mph;
            this.windKph = parsedData.current.wind_kph;
            this.windDegree = parsedData.current.wind_degree;
            this.windDir = parsedData.current.wind_dir;
            this.pressureMb = parsedData.current.pressure_mb;
            this.pressureIn = parsedData.current.pressure_in;
            this.feelsLikeC = parsedData.current.feelslike_c;
            this.feelsLikeF = parsedData.current.feelslike_f;
        })
        .catch((error) => {
            this.condition = 'No matching location found';
            console.log('###Error : ' + JSON.stringify(error));
        });
    }
}
