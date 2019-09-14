const path = require('path');
const express = require('express');
const geocode =  require('./src/utils/geocode.js'); //imports geocode function
const nearbyAirports =  require('./src/utils/nearbyAirports.js'); //imports geocode function
const publicDirectory = path.join(__dirname, '../public') //sets directory of where html files are
// var workpls = nearbyAirports();
// console.log(workpls);
const app = express();
app.use(express.static(publicDirectory))
app.get('', (req, res) => {
    return res.send({
            error: 'You must provide an address'
        })
})
app.get('/noise', (req, res) => {
    console.log("req" + req.query);
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
        geocode(req.query.address, (error, {latitude, longitude, location} ={}) => {
            if (error) {
                return res.send({error})
            } else {
                res.send({
                    location,
                    latitude,
                    longitude
                })
               }
       })
    })
        
            //geocode(req.query.address, (error, {latitude, longitude, location} ={}) => {
            //     if (error) {
            //         console.log(error);
            //     } else {
            //      locationUpdate: lattitude + longitude
            //     }
// });
app.listen(8080), () => {
    console.log('Server is up and running on port 8080');
}
