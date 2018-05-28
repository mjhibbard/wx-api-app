var express     = require("express"),
    Forecast    = require('forecast'),
    bodyParser  = require("body-parser"),
    app         = express(),
    request     = require("request");


//APP CONFIG
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//API CONFIG
// Initialize
var forecast = new Forecast({
  service: 'darksky',
  key: 'a36bbe0e0a26744216a7202ecb240d46',
  units: 'fahrenheit',
  cache: true,      // Cache API requests
  ttl: {            // How long to cache requests. Uses syntax from moment.js: http://momentjs.com/docs/#/durations/creating/
    minutes: 27,
    seconds: 45
  }
});

// ROUTES
app.get("/", function(req, res){
	res.render("search");
});

app.get("/results", function(req, res){
	var lat = req.query.lattitude;
	var long = req.query.longitude;
	console.log(lat);
	console.log(long);
  //res.send("Hello, it works!");
  //get weather from api with req.query's
  forecast.get([lat, long], true, function(err, weather) {
    if(err){
     	console.log(err);
    } else{
      res.render("results", {weather: weather, lat: lat, long: long});
      //console.log(weather);
       console.log("Weather has been retreived!!!!");
      //console.log( weather["hourly"]["summary"]);
    }
  });
});

// app.listen(process.env.PORT, process.env.IP, function(){
// 	console.log("The Wx API app has started!");
// });

app.listen(3000, function(){
  console.log("The Local Weather API is running.");
});