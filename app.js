//jshint esversion:6

const express = require("express");
const https = require("https"); // native node modole for calling requrest
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    
})

app.post("/",function(req,res){
    const query = req.body.cityName;
    const apiKEY = "c66ccd351fded94e211e161b45c799a2";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKEY +"&units=" + unit;
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            //const track = document.querySelector(".temperature");
            //$(".temperatur").text(temo)
            res.write("<h1>The temperatur in " + query+ " is " + temp + " degree Celcius</h1>");
            res.write("<p> The weather is currently " + weatherDescription + "</p>")
            res.write("<img src=" +imageURL +">");
            res.send();
        })
    })
})

app.listen(3000,function(){
    console.log("Server is running on port 3000");

})

