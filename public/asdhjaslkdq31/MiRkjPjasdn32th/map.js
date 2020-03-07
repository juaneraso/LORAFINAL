var map = L.map('map').setView([1.23258, -77.29342],16);
var marker = []
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
marker =[]

  dispositivo = dispositivos[0];
  if (dispositivo != undefined) {
    var html6 =`<h5 align="center"> Bicicleta ${dispositivo.id_Number} </h5>`
  }
  else {
    var html6 = `<h5 align="center"> Bicicleta no existe</h5>`
  }
  document.getElementById('tit2').innerHTML = html6;

  var cont = 0
  console.log(dispositivo.lat.length, dispositivo.fecha.length)
  //console.log(iddispositivo);
for(var k=0;k<dispositivo.lat.length;k++) {

  //var m = dispositivo.datos[k]
  var dt = new Date(dispositivo.fecha[k]);
  var dia = dt.getDate();
  var mes = dt.getMonth() +1;
  var año = dt.getFullYear();

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

 //if(dispositivo.datos[k] == 13){
 if(dia == dia2 && mes == mes2 && año == año2){

   latitud[cont]=dispositivo.lat[k];
   longitud[cont]=dispositivo.lon[k];
   rssi[cont]=dispositivo.rssi[k];
   idgateway[cont] = dispositivo.gateway[k];

   cont=cont+1
  }

}
var LeafIcon1 = L.Icon.extend({
	options: {
		iconSize:     [30, 30],
		iconAnchor:   [20, 20],
		popupAnchor:  [-3, -16]
	}
  });

  var LeafIcon2 = L.Icon.extend({
  	options: {
  		iconSize:     [20, 20],
  		iconAnchor:   [20, 20],
  		popupAnchor:  [-3, -16]
  	}
    });
    var LeafIcon3 = L.Icon.extend({
    	options: {
    		iconSize:     [40, 40],
    		iconAnchor:   [20, 20],
    		popupAnchor:  [-3, -16]
    	}

});
var m1 = new LeafIcon1({iconUrl: 'm1.png'});
var m2 = new LeafIcon2({iconUrl: 'm7.png'});
var m3 = new LeafIcon3({iconUrl: 'm2.png'});
/*
var m4 = new LeafIcon({iconUrl: 'm4.PNG'});
var m5 = new LeafIcon({iconUrl: 'm5.PNG'});
var m6 = new LeafIcon({iconUrl: 'm6.PNG'});
var m7 = new LeafIcon({iconUrl: 'm7.PNG'});
var m8 = new LeafIcon({iconUrl: 'm8.PNG'});
*/
/*
if (dia2 == 31){
latgw = 1.22233
longw = -77.266408
}
*/
// CENTRO
latgw = 1.21272
longw = -77.27715
//TOROBAJO
latgw2 = 1.23243
longw2 = -77.29345
// VIPRI
latgw3 = 1.21267
longw3 = -77.29132

for(var j=0;j<=cont-1;j++) {
  if(idgateway[j]==1){
    var d = getKilometros(latgw,longw,latitud[j],longitud[j])
    var rs = "rssi: " + rssi[j] + " distancia: " + d
    var Lmarker = L.marker([latitud[j], longitud[j]],{icon:m1}, {draggable: false} ).bindPopup(rs)
  }
  if(idgateway[j] ==2){
    var d = getKilometros(latgw2,longw2,latitud[j],longitud[j])
    var rs = "rssi: " + rssi[j] + " distancia: " + d
    var Lmarker = L.marker([latitud[j], longitud[j]],{icon:m2}, {draggable: false} ).bindPopup(rs)
  }
  if(idgateway[j] ==3){
    var d = getKilometros(latgw3,longw3,latitud[j],longitud[j])
    var rs = "rssi: " + rssi[j] + " distancia: " + d
    var Lmarker = L.marker([latitud[j], longitud[j]],{icon:m3}, {draggable: false} ).bindPopup(rs)
  }
  marker.push(Lmarker)
 //if(idgateway[j] ==1){
  map.addLayer(marker[j]);
  //}
  if(j == cont-1){
  map.panTo([parseFloat(latitud[j]), parseFloat(longitud[j])])
  }
}
//var Lmarker2 = L.marker([latgw,longw], {draggable: false} ).bindPopup("GATEWAY").addTo(map)
//var Lmarker3 = L.marker([latgw2,longw2], {draggable: false} ).bindPopup("GATEWAY").addTo(map)

console.log(cont)
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
