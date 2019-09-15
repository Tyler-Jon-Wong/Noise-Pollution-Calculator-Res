const distance = require('./distance');
const fs = require("fs");
const dataBuffer1 = fs.readFileSync('../data/airportCoor.json');
const dataJSON1 = dataBuffer1.toString();
const finalAirport = JSON.parse(dataJSON1);

for (var i=0; i<finalAirport.length;i++) {
    if (distance([finalAirport[i].latitude_deg, finalAirport[i].longitude_deg], [43.6529, -79.3849]) < 20) {
        console.log(finalAirport[i].gps_code);
    }
 }



// distance