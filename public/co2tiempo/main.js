//var http = 'http://192.68.185.29:8081'
//var http = 'http://192.168.0.16:8081'
//var http = 'http://192.168.43.47:8081';
var http = 'http://192.168.0.19:8081'

var socket = io.connect(http,{'forceNew':true});
var estado=0
var cont
var fech=[]
var co2=[]
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
  co2=[]
  fech =[]
  cont = 0
   distancia = 0
   decimal_data2 = [];

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
     co2[cont]=dispositivo.co2[k];

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

          decimal_data2.push({
            x: fech[x],
            y: co2[x]
          });

        }
      }
else {
  document.getElementById('GRAFICAS').innerHTML = html3;
}

document.getElementById('GRAFICAS').innerHTML = html2;
inGraf()
morris1.setData(decimal_data2)

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
