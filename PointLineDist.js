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
    var f1 = radians(pointA[0]);
    var f2 = radians(pointB[0]);
    var af = radians(pointB[0]-pointA[0]);
    var aa = radians(pointA[1]-pointB[1]);
    var a = Math.sin(af/2) * Math.sin(af/2) +
        Math.cos(f1) * Math.cos(f2) *
        Math.sin(aa/2) * Math.sin(aa/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d/1000;
}

function pointLineDist(p, v, w) {
	var m = (v[1]-w[1])/(v[0]-w[0]);
	if (m == 0) {
		m = 0.001;
	}
	var mi = 1/m;
	var x = (p[1]-v[0]+m*p[0]+mi*p[0])/(m+mi);
	var y = m*(x-p[0])+p[1];
	if (x < v[0]) {
		x = x[0];
		y = y[0];
	} else if (x > w[0]) {
		x = x[1];
		y = y[1];
	}
	return distance(p,[x,y]);
}
console.log(pointLineDist([4,5],[0,0],[5,0]));