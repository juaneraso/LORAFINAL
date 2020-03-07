//****MORRIS
//var http = 'http://209.182.218.174:8081';
var http = 'http://192.68.185.29:8081'
//var http = 'http://192.168.0.16:8081'
//var http = 'http://192.168.43.47:8081';
//var http = 'http://192.168.0.16:8081'
//var http = 'http://172.16.15.161:8081';
//var http = 'http://192.168.0.19:8081'
var socket = io.connect(http,{'forceNew':true});
//var socket = io.connect('http://192.168.0.16:8081',{'forceNew':true});
//var socket = io.connect('http://172.16.9.250:8081',{'forceNew':true});
////https://variabletecnica.wordpress.com/2013/08/25/crear-y-descargar-archivos-con-javascript/
var html7 = ` `
var estado=0
var cont
var fech=[]
var voltaje=[]
var corriente=[]
var potencia=[]
var temperatura=[]
var humedad=[]
var fecha
var morris1
var morris3
var morris4
var id
var d=[]
$("#bot").on("click",function(){
//  var id = 123456;
  id =  document.getElementById('Disp').value
  fecha = document.getElementById('start').value
  estado = document.getElementById('sensor').value
 document.getElementById('GRAFICAS').innerHTML = html4;
 document.getElementById('tit2').innerHTML = html7;
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
gVol();
gCor();
gPot();
gEner();

socket.on('resGetDispositive2',function(dispositivos,fecha) {
  dispositivo = dispositivos[0];
  voltaje=[]
  corriente=[]
  potencia=[]
  temperatura=[]
  humedad=[]
  fech =[]
  cont = 0
  if (dispositivo != undefined) {
    var html6 =`<h5 align="center"> Bicicleta ${dispositivo.id_Number} </h5>`
  }
  else {
    var html6 = `<h5 align="center"> Bicicleta no existe</h5>`
    document.getElementById('GRAFICAS').innerHTML = html7;
  }
  document.getElementById('tit2').innerHTML = html6;


  var decimal_data2 = [];
  var decimal_data4 = [];
  var decimal_data6 = [];
  var decimal_data8 = [];
  var decimal_data10 = [];
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

     voltaje[cont]=dispositivo.voltaje[k];
     corriente[cont]=dispositivo.corriente[k];
     temperatura[cont]=dispositivo.temperatura[k];
     humedad[cont]=dispositivo.humedad[k];
     if(temperatura[cont]>=200){
       temperatura[cont]=temperatura[cont-1]
     }
     if(humedad[cont]>=200){
       humedad[cont]=humedad[cont-1]
     }
     d[cont] = new Date(dispositivo.fecha[k]);
     var h = addZero(d[cont].getHours());
     var m = addZero(d[cont].getMinutes());
     var s = addZero(d[cont].getSeconds());
     var x = h + ":" + m + ":" + s;
     fech[cont] =x;
     potencia[cont]=voltaje[cont]*corriente[cont];
     potencia[cont]=potencia[cont].toFixed(2);
     cont=cont+1
    }
  }
  console.log(cont)

energia = 0
if(cont > 0){
  if(estado==1){

        for (var x = 0; x < cont; x += 2) {
          decimal_data2.push({
            x: fech[x],
            y: voltaje[x]
          });
          decimal_data4.push({
            x: fech[x],
            y: corriente[x]
          });
          decimal_data6.push({
            x: fech[x],
            y: potencia[x]
          });

        }
        for (var i = 0; i < potencia.length; i++) {
          if(i >0){
            tiempo = (d[i]-d[i-1])/(1000*3600)
            energia = energia + (potencia[i]*tiempo)
          }
        }
        var dataen =
          [
          {label: "Energia", value: energia.toFixed(2)}]

        console.log(energia)
        document.getElementById('GRAFICAS').innerHTML = html2;
        gVol(); gCor(); gPot(); gEner();
        morris1.setData(decimal_data2);
        morris3.setData(decimal_data4);
        morris4.setData(decimal_data6);
        morris7.setData(dataen);


    }
  if (estado==2) {
    for (var x = 0; x < cont; x += 2) {
      decimal_data8.push({
        x: fech[x],
        y: temperatura[x]
      });
      decimal_data10.push({
        x: fech[x],
        y: humedad[x]
      });

  }

  document.getElementById('GRAFICAS').innerHTML = html;
  var morris5 = new Morris.Line({
  element: 'temperatura',
  data: decimal_data8,
  xkey: 'x',
  ykeys: ['y'],
  labels: ['Value'],
  parseTime: false,
  lineWidth: 1,
  resize: true
  });

  var morris6 = new Morris.Line({
  element: 'humedad',
  data: decimal_data10,
  xkey: 'x',
  ykeys: ['y'],
  labels: ['Value'],
  parseTime: false,
  lineWidth: 1,
  resize: true
  });

  }
}
else {
  document.getElementById('GRAFICAS').innerHTML = html3;
}
})
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

function gVol(){
morris1 = new Morris.Line({
element: 'voltaje',
data: decimal_data,
xkey: 'x',
ykeys: ['y'],
labels: ['Value'],
parseTime: false,
lineWidth: 1,
resize: true
});
}
function gCor(){
morris3 = new Morris.Line({
element: 'corriente',
data: decimal_data,
xkey: 'x',
ykeys: ['y'],
labels: ['Value'],
parseTime: false,
lineWidth: 1,
resize: true
});
}
function gPot(){
morris4 = new Morris.Line({
element: 'potencia',
data: decimal_data,
xkey: 'x',
ykeys: ['y'],
labels: ['Value'],
parseTime: false,
lineWidth: 1,
resize: true
});
}

function gEner(){
morris7 = new Morris.Donut({
element: 'energia',
data: [
{label: "Energia", value: 0 }],
parseTime: false,
resize: true,
formatter: function(x){
  return x +"Wh"
}
});
}

function addZero(i) {
if (i < 10) {
  i = "0" + i;
}
return i;
}
