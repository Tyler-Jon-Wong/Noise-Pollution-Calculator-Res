const unirest = require("unirest");
const fs = require("fs");
const path = require('path');
const icaoDirectory = path.join(__dirname, '../data/IATAICAO_converted.json') //sets directory of where html files are

//Load CSV file
const dataBuffer = fs.readFileSync(icaoDirectory);
const dataJSON = dataBuffer.toString();
const finalData = JSON.parse(dataJSON); //array


let airports = [];
let iata;
let icao = "";
let counter=0;
let nearbyAirportsICAO = [];


var req = unirest("GET", "https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/by-radius");
var nearAirports = []


req.query({
	"radius": "50",
	"lng": "79.5463",
	"lat": "43.636500"
});

req.headers({
	"x-rapidapi-host": "cometari-airportsfinder-v1.p.rapidapi.com",
	"x-rapidapi-key": "5b5bf179d1mshe6b2e5bab5cde5dp1baccajsn114e204c8a68"
});


req.end(function (res) {
	if (res.error) throw new Error(res.error);
		for (var i=0; i<res.body.length;i++) {
			icao="";
			//airports.push(res.body[i].code);
			iata = res.body[i].code
			for(var j=0;j<finalData.length;j++) {
				if (finalData[j].IATA == res.body[i].code) {
					icao = finalData[j].ICAO;
					nearbyAirportsICAO.push(icao);
					icao = "";
			}
		}
		console.log(nearbyAirportsICAO);
	}
	//nearAirports = nearbyAirportsICAO;
	});






