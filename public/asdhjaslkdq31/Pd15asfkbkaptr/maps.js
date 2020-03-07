var map = L.map('map').setView([1.23258, -77.29342],17);

L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 20
}).addTo(map);
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
socket.on('Datoañadido',function(data) {

	//console.log(x, y);
	//L.marker([x, y], {draggable: true}).addTo(map);
	console.log(data.id_Number, dato2)
	if (dato2 != 0){
  if (dato2 == data.id_Number){
	socket.emit('getDispositive',dato2)
  console.log(data.id_Number, dato2)
	}
}

})
var marker = []
var i = 0
var iddispositivo = 0
socket.on('resGetDispositive',function(dispositivos,id1) {
console.log(dispositivo.id_Number);
if (dato2 == dispositivo.id_Number){
					dispositivo = dispositivos[0];
          if (dispositivo != undefined) {
            var html6 =`<h5 align="center"> Bicicleta ${dispositivo.id_Number} </h5>`
          }
          else {
            var html6 = `<h5 align="center"> Bicicleta no existe</h5>`
          }
        document.getElementById('tit').innerHTML = html6;
					//console.log(dispositivo)
					//console.log(iddispositivo);
          if (dato2 == dispositivo.id_Number){
					var x = parseFloat(dispositivo.lat[dispositivo.lat.length-1])
					var y = parseFloat(dispositivo.lon[dispositivo.lon.length-1])
					//console.log(dispositivo.lat);
          if (dato2 != iddispositivo){
						for(var k=0;k<marker.length;k++) {
						map.removeLayer(marker[k]);
					}
					i = 0
					marker =[]
				}

			    var Lmarker = L.marker([x, y], {draggable: false}).bindPopup(dispositivo.fecha[dispositivo.fecha.length-1])
					marker.push(Lmarker)
					map.addLayer(marker[i]);
					map.panTo([x, y])
					i+=1
					iddispositivo = dispositivo.id_Number
          }
        }
						})
