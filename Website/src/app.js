const path = require('path');
const express = require('express');
const geocode =  require('./utils/geocode'); //imports geocode function
const publicDirectory = path.join(__dirname, '../public') //sets directory of where html files are

const fs = require("fs");

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
                var airportLats = []
                var airportLongs = []

                for(var a=0; a<nearbyAirports.length; a++) {
                    for (var b=0; b<finalData.length;b++) {
                        if (finalData[b].airport_ident == nearbyAirports[a]) {
                            if (finalData[b].airport_ident != finalData[b-1].airport_ident) {  
                                airportLats.push(finalData[a].latitudeAP);                             
                            } else {}
                        }

                    }
                    
                }
                 for(var c=0; c<nearbyAirports.length; c++) {
                    for (var d=0; d<finalData.length;d++) {
                        if (finalData[d].airport_ident == nearbyAirports[c]) {
                            if (finalData[d].airport_ident != finalData[d-1].airport_ident) {  
                                airportLongs.push(finalData[c].longitudeAP);                             
                            } else {}
                        }
                    }
                    
                }

            res.send({
                latitudesAP: airportLats,
                longitudesAP: airportLongs
            })        

             }
            })
        }) 


//console.log(latitude1)
        
//console.log('test4')
    

app.listen(8080), () => {
    console.log('Server is up and running on port 8080');
}