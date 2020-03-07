//var http = 'http://192.168.0.24:8081'
//var http = 'http://209.182.218.174:8081';
var http = 'http://192.68.185.29:8081'
//var http = 'http://192.168.0.16:8081'
//var http = 'http://192.168.43.47:8081';
//var http = 'http://172.16.15.161:8081';
//var http = 'http://192.168.0.19:8081'
var socket = io.connect(http,{'forceNew':true});
//var socket = io.connect('http://192.168.0.16:8081',{'forceNew':true});
//var socket = io.connect('http://172.16.9.250:8081',{'forceNew':true});
//https://variabletecnica.wordpress.com/2013/08/25/crear-y-descargar-archivos-con-javascript/
var estado=0
var cont
var fech=[]
var rssi=[]
var fecha
var morris1
var id
var dist=[]
var html8 = ` `
$("#bot").on("click",function(){
//  var id = 123456;
  id =  document.getElementById('Disp').value
   fecha = document.getElementById('start').value
   document.getElementById('GRAFICAS').innerHTML = html4;
   document.getElementById('tit2').innerHTML = html8;
   socket.emit('getDispositive2',id,fecha)
})

var decimal_data = [];
for (var i = 0; i < 10; i++) {
  decimal_data.push({
    x: i,
    y: 0
  });
}
document.getElementById('GRAFICAS').innerHTML = html2;
inGraf()
socket.on('resGetDispositive2',function(dispositivos,fecha) {
  dispositivo = dispositivos[0];
  rssi=[]
  fech =[]
  dist=[]
  cont = 0
   distancia = 0
   decimal_data2 = [];
   decimal_data4 = [];
   arreglo =[];
   latitud=[]
   longitud=[]
   idgateway=[]

   if (dispositivo != undefined) {
     var html6 =`<h5 align="center"> Bicicleta ${dispositivo.id_Number} </h5>`
   }
   else {
     var html6 = `<h5 align="center"> Bicicleta no existe</h5>`
     document.getElementById('GRAFICAS').innerHTML = html8;
   }
   document.getElementById('tit2').innerHTML = html6;


  function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

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

  for(var k=0;k<dispositivo.fecha.length;k++) {
    var dt = new Date(dispositivo.fecha[k]);
    var dia = dt.getDate();
    var mes = dt.getMonth() +1;
    var año = dt.getFullYear();

   if(dia == dia2 && mes == mes2 && año == año2){
     latitud[cont]=dispositivo.lat[k];
     longitud[cont]=dispositivo.lon[k];
     rssi[cont]=dispositivo.rssi[k];
     idgateway[cont] = dispositivo.gateway[k];

     var d = new Date(dispositivo.fecha[k]);
     var h = addZero(d.getHours());
     var m = addZero(d.getMinutes());
     var s = addZero(d.getSeconds());
     var x = h + ":" + m + ":" + s;
     fech[cont] =x;
     cont=cont+1
    }
  }
  console.log(cont)

if(cont > 0){
        for (var x = 0; x < cont; x += 1) {
          if(idgateway[x]==1){
          dist[x] = getKilometros(latgw,longw,latitud[x],longitud[x])
          }
          if(idgateway[x]==2){
          dist[x] = getKilometros(latgw2,longw2,latitud[x],longitud[x])
          }
          if(idgateway[x]==3){
          dist[x] = getKilometros(latgw3,longw3,latitud[x],longitud[x])
          }
          decimal_data2.push({
            x: fech[x],
            y: rssi[x]
          });
          decimal_data4.push({
            x: dist[x],
            y: rssi[x]
          });
        }
        decimal_data4.sort((a, b) => a.x - b.x);
      }
else {
  document.getElementById('GRAFICAS').innerHTML = html3;
}

document.getElementById('GRAFICAS').innerHTML = html2;
inGraf()
morris1.setData(decimal_data2)
morris2.setData(decimal_data4)
prom1 = 0;
prom2 = 0;
prom3 = 0;
prom4 = 0;
prom5 = 0;
prom6 = 0;
c1=0;
c2=0;
c3=0;
c4=0;
c5=0;
c6=0;

for (var x = 0; x < cont; x += 1) {
if(idgateway[x] ==1){
if(d[x] <= 0.5){
  prom1 = prom1 + rssi[x]
  c1+=1;
}
if(d[x]>0.5 && d[x]<=1){
  prom2 = prom2 + rssi[x]
  c2+=1;
}
if(d[x]>1 && d[x]<=1.5){
  prom3 = prom3 + rssi[x]
  c3+=1;
}
if(d[x]>1.5 && d[x]<=2){
  prom4 = prom4 + rssi[x]
  c4+=1;
}
if(d[x]>2 && d[x]<=2.5){
  prom5 = prom5 + rssi[x]
  c5+=1;
}
if(d[x]>2.5){
  prom6 = prom6 + rssi[x]
  c6+=1;
}
}

}
prom1=prom1/c1;
prom2=prom2/c2;
prom3=prom3/c3;
prom4=prom4/c4;
prom5=prom5/c5;
prom6=prom6/c6;
//console.log(c1, c2, c3, c4, c5, c6)
//console.log(prom1, prom2, prom3, prom4, prom5, prom6)
})

function inGraf(){
morris1 = new Morris.Line({
element: 'rssi',
data: decimal_data,
xkey: 'x',
ykeys: ['y'],
labels: ['Value'],
parseTime: false,
lineWidth: 1,
resize: true
});
morris2 = new Morris.Line({
element: 'rssi2',
data: decimal_data,
xkey: 'x',
ykeys: ['y'],
labels: ['Value'],
parseTime: false,
lineWidth: 1,
resize: true
});
}
//latgw = 1.22233
//longw = -77.266408

// CENTRO
latgw = 1.21272
longw = -77.27715
//TOROBAJO
latgw2 = 1.23243
longw2 = -77.29345
// VIPRI
latgw3 = 1.21267
longw3 = -77.29132


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
$(document).ready( function() {
    var now = new Date();
    var month = (now.getMonth() + 1);
    var day = now.getDate();
    if (month < 10)
        month = "0" + month;
    if (day < 10)
        day = "0" + day;
    var today = now.getFullYear() + '-' + month + '-' + day;
    $('#start').val(today);
});
function comparar ( a, b ){ return a - b; }
