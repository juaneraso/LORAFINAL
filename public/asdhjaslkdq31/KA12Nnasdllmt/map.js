var map = L.map('map').setView([1.23258, -77.29342],16);
var marker = []
var fech = []
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
latitud=[];
longitud=[];
co2=[];

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

for(var k=0;k<dispositivo.lat.length;k++) {

  //var m = dispositivo.datos[k]
  var dt = new Date(dispositivo.fecha[k]);
  var dia = dt.getDate();
  var mes = dt.getMonth() +1;
  var año = dt.getFullYear();

 //if(dispositivo.datos[k] == 13){
 if(dia == dia2 && mes == mes2 && año == año2){

   latitud[cont]=dispositivo.lat[k];
   longitud[cont]=dispositivo.lon[k];
   co2[cont]=dispositivo.co2[k];
   var d = new Date(dispositivo.fecha[k]);
   var h = addZero(d.getHours());
   var m = addZero(d.getMinutes());
   var s = addZero(d.getSeconds());
   var x = h + ":" + m + ":" + s;
   fech[cont] =x;
   //console.log(latitud[cont], longitud[cont])

   cont=cont+1
  }

}
console.log(dt2)
console.log(dia2,mes2,año2)
/*
var LeafIcon = L.Icon.extend({
	options: {
		iconSize:     [30, 30],
		iconAnchor:   [20, 20],
		popupAnchor:  [-3, -16]
	}
});
var m1 = new LeafIcon({iconUrl: 'm1.png'});
var m2 = new LeafIcon({iconUrl: 'm2.png'});
var m3 = new LeafIcon({iconUrl: 'm3.png'});
var m4 = new LeafIcon({iconUrl: 'm4.png'});
var m5 = new LeafIcon({iconUrl: 'm5.png'});
var m6 = new LeafIcon({iconUrl: 'm6.png'});
var m7 = new LeafIcon({iconUrl: 'm7.png'});
var m8 = new LeafIcon({iconUrl: 'm8.png'});
*/
var LeafIcon = L.Icon.extend({
	options: {
		iconSize:     [20, 20],
		iconAnchor:   [20, 20],
		popupAnchor:  [-3, -16]
	}
});

var LeafIcon2 = L.Icon.extend({
	options: {
		iconSize:     [25, 25],
		iconAnchor:   [20, 20],
		popupAnchor:  [-3, -16]
	}
});
var LeafIcon3 = L.Icon.extend({
	options: {
		iconSize:     [30, 30],
		iconAnchor:   [20, 20],
		popupAnchor:  [-3, -16]
	}
});


var m1 = new LeafIcon({iconUrl: 'm1.png'});
var m4 = new LeafIcon3({iconUrl: 'm4.png'});
var m5 = new LeafIcon3({iconUrl: 'm5.png'});
var m6 = new LeafIcon({iconUrl: 'm6.png'});
var m7 = new LeafIcon2({iconUrl: 'm7.png'});
var m8 = new LeafIcon2({iconUrl: 'm8.png'});



for(var j=0;j<=cont-1;j++) {
  var popup = co2[j] + " " + fech[j]
  if(co2[j]<=700){
    var Lmarker = L.marker([latitud[j], longitud[j]],{icon:m1}, {draggable: false} ).bindPopup(popup)
  }
  if(co2[j]>700 && co2[j]<=1000){
var Lmarker = L.marker([latitud[j], longitud[j]],{icon:m6}, {draggable: false} ).bindPopup(popup)
  }
  if(co2[j]>1000 && co2[j]<=1500){
var Lmarker = L.marker([latitud[j], longitud[j]],{icon:m7}, {draggable: false} ).bindPopup(popup)
  }
  if(co2[j]>1500 && co2[j]<=2500){
    var Lmarker = L.marker([latitud[j], longitud[j]],{icon:m8}, {draggable: false} ).bindPopup(popup)
  }
  if(co2[j]>2500 && co2[j]<=5000){
    var Lmarker = L.marker([latitud[j], longitud[j]],{icon:m5}, {draggable: false} ).bindPopup(popup)
  }
  if(co2[j]>5000){
    var Lmarker = L.marker([latitud[j], longitud[j]],{icon:m4}, {draggable: false} ).bindPopup(popup)
  }
  marker.push(Lmarker)
  map.addLayer(marker[j]);
  if(j == cont-1){
  map.panTo([parseFloat(latitud[j]), parseFloat(longitud[j])])
  }

}
console.log(cont)
//map.panTo([latitud[k-1], longitud[k-1]])

//console.log(dia2, mes2, año2)
//console.log(dia, mes, año)
//console.log(latitud)
//console.log(longitud)
})
