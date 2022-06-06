//jshint esversion:6;

import express from "express";
import { get } from "https"; // native node modole for calling requrest
import bodyParser from "body-parser";
import { query } from "express";


const app = express();



app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.set('view engine', 'ejs');

let obj = {
    cityName:"",
    temp:0,
    weatherDescription:"",
    humidity:0,
    wind:0,
    feelslike:"",
    imageURL:""
}
app.get("/", function(req, res){
    res.render("weather",{
        cityName: obj.cityName,
        temperature: obj.temp,
        description: obj.weatherDescription,
        humidity: obj.humidity,
        wind: obj.wind,
        feelslike: obj.feelslike,
        imageURL : obj.imageURL
    })
    
})

app.post("/",function(req,res){
    let query = req.body.cityName;
    obj.cityName = query;
    const apiKEY = "c66ccd351fded94e211e161b45c799a2";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKEY +"&units=" + unit;
    get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            obj.temp = weatherData.main.temp;
            obj.weatherDescription = weatherData.weather[0].description;
            obj.wind = weatherData.wind.speed;
            obj.humidity = weatherData.main.humidity;
            obj.feelslike = weatherData.main.feels_like;
            obj.imageURL = "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + "@2x.png"

            res.redirect("/");
            // res.write("<h1>The temperatur in " + query+ " is " + temp + " degree Celcius</h1>");
            // res.write("<p> The weather is currently " + weatherDescription + "</p>")
            // res.write("<img src=" +imageURL +">");
            // res.send();
        })
    })
})

app.listen(3000,function(){
    console.log("Server is running on port 3000");

})

