const path = require('path');
const express = require('express');
const fs = require("fs");


const geocode =  require('./utils/geocode'); //imports geocode function
const distance = require('./utils/distance'); //imports distance function
const airpaths = require('./utils/airpaths') //imports airpaths function

const publicDirectory = path.join(__dirname, '../public') //sets directory of where html files are


const app = express();

var test = []

app.use(express.static(publicDirectory))
//-----------------
const icaoDirectory = path.join(__dirname, '/data/IATAICAO_converted.json') //sets directory of where html files are

let airports = [];
let iata;
let icao = "";
let counter=0;
let nearbyAirportsICAO = [];
var nearAirports = []
let testing = []
let latitude1 = ""
let longitude1 = ""


app.get('', (req, res) => {
    console.log('test1')
    return res.send({
            error: 'You must provide an address'
        })
})

app.get('/noise', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
            })   
        }
        geocode(req.query.address, (error, {latitude, longitude, location} ={}) => {
            if (error) {
                return res.send({error})
            } else {
                nearbyAirports = ["CYYZ", "CYZD", "CYOO", "CYKZ", "CYTZ"]
                const dataBuffer = fs.readFileSync('data/airportData.json');
                const dataJSON = dataBuffer.toString();
                const finalData = JSON.parse(dataJSON);

                const dataBuffer1 = fs.readFileSync('data/airportCoor.json');
                const dataJSON1 = dataBuffer1.toString();
                const finalAirport = JSON.parse(dataJSON1);

                var airportLats = [];
                var airportLongs = [];
                var noiseFactors = [];
                var runways = [];
                var runway1 = []

                for(var a=0; a<nearbyAirports.length; a++) {
                    for (var b=0; b<finalAirport.length; b++) {
                        if (finalAirport[b].gps_code == nearbyAirports[a]) {
                            if (finalAirport[b].gps_code != finalAirport[b-1].gps_code) {
                                runway1 = []  
                                airportLats.push(finalAirport[b].latitude_deg); 
                                airportLongs.push(finalAirport[b].longitude_deg); 
                                var airportText = ""

                                dist = distance([latitude, longitude], [finalAirport[b].latitude_deg, finalAirport[b].longitude_deg])
                                dist = Math.round(dist, 2);

                                //add if smaller than 20km
                                if (dist > 25) {
                                } else {
                                airportText = finalAirport[b].name + " " + dist.toString(10) + " km away."
                                noiseFactors.push(airportText);
        
                                for (var num=0; num<finalData.length; num++) {
                                    //console.log(finalData[num].airport_ident + " " + nearbyAirports[a])
                                    if (finalData[num].airport_ident == nearbyAirports[a]) {
                                        runway1 = [];
                                        dist = -0.03;
                                        if (finalData[num].length_ft > 8000) {
                                            dist = -0.08;
                                        } else if (finalData[num].length_ft < 1500){
                                            dist = -0.15
                                        }
                                        //console.log([finalData[num].Start_latitude + " " + finalData[num].Start_longitude]+ " " + [finalData[num].End_latitude + " " + finalData[num].End_longitude])
                                        runway1 = airpaths(dist, [finalData[num].Start_latitude, finalData[num].Start_longitude], [finalData[num].End_latitude, finalData[num].End_longitude])
                                        runways.push(runway1);
                                        //console.log(runway1)
                                    }
                                   

                                }
                                

                                }
                            }
                        
                        }

                    }
                    
                }
            res.send({
                latitudesAP: airportLats,
                longitudesAP: airportLongs,
                location,
                longitude,
                latitude,
                noiseFactors,
                runways
            })        

             }
            })
        })     

app.listen(8080), () => {
    console.log('Server is up and running on port 8080');
}