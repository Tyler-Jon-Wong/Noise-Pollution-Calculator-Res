function radians(deg) {
    return deg*Math.PI / 180;
}
function distance(pointA, pointB) {
    /*
    Algorithm taken from http://www.movable-type.co.uk/scripts/latlong.html
        pointX = [lat, long]
        returns meters
    */  
    var R = 6371e3; // metres
    var φ1 = radians(pointA[0]);
    var φ2 = radians(pointB[0]);
    var Δφ = radians(pointB[0]-pointA[0]);
    var Δλ = radians(pointA[1]-pointB[1]);
    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d/1000;
}


//console.log(distance([43.637023,0 -79.72577],[43.67720032, -79.63059998])); //should return 14.71km

module.exports = distance;