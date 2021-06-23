const express= require("express");


const https= require("https");

const bodyParser= require("body-parser");

const app= express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res){
  res.sendFile(__dirname+"/index.html");

  });
app.post("/", function(req,res){

  const query= req.body.cityName;
  const appKey="59d91ee8a0c12bd9518f61af8701a163";

  const unit= "metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appKey+"&units="+unit;
  https.get(url, function(response){
  console.log(response.statusCode);

  response.on("data", function(data){
    const weatherData= JSON.parse(data);
    const temp=weatherData.main.temp;
    const desc= weatherData.weather[0].description;

    const icon = weatherData.weather[0].icon;

    const urlImage="https://openweathermap.org/img/wn/"+icon+"@2x.png";

    res.write("<p>The weather is"+desc+"</p>");
    res.write("<h1> The weather in "+query+ " is" + temp+ "degrees</h1>");
    res.write("<img src="+urlImage+">");
    res.send();

  });
});
});
app.listen(3000, function(){
  console.log("Server is up!");
}) ;
