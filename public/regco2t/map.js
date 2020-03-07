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
var LeafIcon = L.Icon.extend({
	options: {
		iconSize:     [15, 15],
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
		iconSize:     [25, 25],
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


socket.on('resGetDispositive3',function(dispositivos) {
  for(var z=0;z<marker.length;z++) {
  map.removeLayer(marker[z]);
}
marker =[]
latitud=[];
longitud=[];
co2=[];
console.log(dispositivos.length)
  for (var i = 0; i < dispositivos.length; i++) {
    dispositivo = dispositivos[i];
    if (dispositivo != undefined) {
      var html6 =`<h5 align="center"> Bicicleta ${dispositivo.id_Number} </h5>`
    }
    else {
      var html6 = `<h5 align="center"> Bicicleta no existe</h5>`
    }
      document.getElementById('tit2').innerHTML = html6;
      var cont = 0
      console.log(dispositivo.lat.length, dispositivo.fecha.length)
    for(var k=0;k<dispositivo.lat.length;k++) {
     if(dispositivo.co2[k] > 0){
       latitud[cont]=dispositivo.lat[k];
       longitud[cont]=dispositivo.lon[k];
       co2[cont]=dispositivo.co2[k];
       fech[cont] =dispositivo.fecha[k];
       cont=cont+1
      }

    }


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
  }
//  dispositivo = dispositivos[0];


console.log(cont)
})
