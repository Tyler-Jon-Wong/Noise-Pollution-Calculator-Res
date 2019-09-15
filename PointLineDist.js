// taken from https://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment
function sqr(x) {return x*x}
function dist2(v, w) { return sqr(v[0] - w[0]) + sqr(v[1] - w[1]) }
function pointLineDist(p, v, w) {
  // line v, w and point p are all arrays
  var l2 = dist2(v, w);
  console.log(l2);
  if (l2 == 0) return dist2(p, v);
  var t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
  t = Math.max(0, Math.min(1, t));
  return Math.sqrt(dist2(p, [v[0] + t * (w[0] - v[0]),
         v[1] + t * (w[1] - v[1])]));
}
console.log(pointLineDist([4,5],[0,0],[5,0]));