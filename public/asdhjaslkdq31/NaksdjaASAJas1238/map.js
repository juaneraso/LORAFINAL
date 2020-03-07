var map = L.map('map').setView([1.23258, -77.29342],16);
var marker = []
var polylines =[]
var distancia= 0
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 20
}).addTo(map);
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
socket.on('resGetDispositive2',function(dispositivos,fecha) {

  for(var z=0;z<marker.length;z++) {
  map.removeLayer(marker[z]);
}
map.removeLayer(polylines);
marker =[]
var polylinePoints = []
dispositivo = dispositivos[0];
var cont = 0
distancia =0
var dt2 = new Date(fecha);
var dia2 = dt2.getDate() + 1;
var mes2 = dt2.getMonth() +1;
var año2 = dt2.getFullYear();
if(mes2 == 1 || mes2 == 3 || mes2 == 5 || mes2 == 7 || mes2 == 8 || mes2 == 10 || mes2 == 12){
  if(dia2 == 32) {
    dia2=1;
    mes2=mes2+1;
  }
}
if(mes2 == 4 || mes2 == 6 || mes2 == 9 || mes2 == 11){
  if(dia2 == 31) {
    dia2=1;
    mes2=mes2+1;
  }
}
if(mes2 == 2){
  if(año2 == 2020){
    if(dia2 == 30) {
      dia2=1;
      mes2=mes2+1;
    }
    }
    else{
      if(dia2 == 29) {
        dia2=1;
        mes2=mes2+1;
      }
    }
}
if (dispositivo != undefined) {
  var html6 =`<h5 align="center"> Bicicleta ${dispositivo.id_Number} </h5>`
}
else {
  var html6 = `<h5 align="center"> Bicicleta no existe</h5>`
}
document.getElementById('tit2').innerHTML = html6;


for(var k=0;k<dispositivo.lat.length;k++) {
  var dt = new Date(dispositivo.fecha[k]);
  var dia = dt.getDate();
  var mes = dt.getMonth() +1;
  var año = dt.getFullYear();

 if(dia == dia2 && mes == mes2 && año == año2){
   latitud[cont]=dispositivo.lat[k];
   longitud[cont]=dispositivo.lon[k];
   var d = new Date(dispositivo.fecha[k]);
   var h = addZero(d.getHours());
   var m = addZero(d.getMinutes());
   var s = addZero(d.getSeconds());
   var x = h + ":" + m + ":" + s;
   fech[cont] =x;
   cont=cont+1
  }

}

for(var j=0;j<cont;j+=1) {
        if(j>0){
        var d =  getKilometros(latitud[j],longitud[j],latitud[j-1],longitud[j-1])
        if((1000*d) > 5){
        distancia += parseFloat(d)
        }
        //console.log(d)
        var popup = fech[j]
      }
      //console.log(distancia.toFixed(3))
  var Lmarker = L.marker([latitud[j], longitud[j]], {draggable: false}).bindPopup(popup)
  marker.push(Lmarker)
  map.addLayer(marker[j]);

  if(j % 10 == 0){

      }
  if(j == cont-1){
  map.panTo([parseFloat(latitud[j]), parseFloat(longitud[j])])
  }
polylinePoints.push([latitud[j],longitud[j]])
}
console.log(cont)

polylines = L.polyline(polylinePoints);
polylines.addTo(map);
var html = `<p align="center">Distancia Recorrida <i>${distancia.toFixed(3)}<i> Km<p>`
document.getElementById('distancia').innerHTML = html;
})

getKilometros = function(lat1,lon1,lat2,lon2)
{
rad = function(x) {return x*Math.PI/180;}
//var R = 6378.137; //Radio de la tierra en km
var R = 6371.0; //Radio de la tierra en km
var dLat = rad( lat2 - lat1 );
var dLong = rad( lon2 - lon1 );
var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
var d = R * c;
return d.toFixed(3); //Retorna tres decimales
}
