const convertToDeg = (Rad) => {
    return Rad*180/Math.PI;
    }

    const findLat = (distance, lattitude)   => {
    var y = 0;
    var operation =0;
    var tanOp = convertToDeg(Math.atan(0.5994)); //slope
    //console.log(tanOp)
    var sinOp = Math.sin(tanOp*Math.PI/180);
    sinOp = sinOp*distance
    operation = sinOp+lattitude;
    return operation
    }

    const findLong = (distance, longitude)   => {
    var tanOp = convertToDeg(Math.atan(0.5994));
    var cosOp = Math.cos(tanOp*Math.PI/180);
    cosOp = cosOp*distance;
    return longitude+cosOp;

    }   


const airpaths = (distance, [latbot, longbot], [lattop, longtop]) => {
    //Find point on bottom runway
    latBot = findLat(distance, latbot)
    longBot = findLong(distance, longbot)
    bottom = [latBot, longBot]
    //Find point on top runway
    latTop = findLat(-1*distance, lattop)
    longTop = findLong(-1*distance, longtop)
    top = [latTop, longTop]
    return [bottom, top]
}

//points = airpath(-0.08, [43.6947, -79.6333], [43.6739, -79.6680]) should return 2 points at 0.8 distance away, same slope.

module.exports = airpaths;