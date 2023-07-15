const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{

    res.sendFile(__dirname + "/index.html");
   
})

app.post('/',(req,res)=>{

    var cityName = req.body.cityName;
    const query = cityName;
    const apiKey = "20234dfd60d22463bd36c9d7b60cff4c";
    const unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`
    https.get(url,
    (response)=>{
        console.log(response.statusCode);
        response.on("data",(data)=>{
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imgUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
            const description = weatherData.weather[0].description;
            console.log(description);
            res.write(`<h1>The temp on ${query} is ${temp} degree celcius</h1>`);
            res.write(`<p>The weather is currently ${description}</p>`);
            res.write(`<img src = ${imgUrl}></img>`);
            res.send();
        })
    })
})

/* */

app.listen(3000,()=>{
    console.log("The server is running at port 3000");
})