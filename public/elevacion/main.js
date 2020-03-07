
var http = 'http://172.16.15.161:8081';
//var http = 'http://192.68.185.29:8081'
var socket = io.connect(http,{'forceNew':true});
var map = L.map('map');
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="http://www.osm.org">OpenStreetMap</a>'
}).addTo(map);
