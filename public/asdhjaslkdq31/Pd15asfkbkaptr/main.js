//var http = 'http://209.182.218.174:8081';
//var http = 'http://192.168.0.24:8081'
//var http = 'http://192.168.0.16:8081'
//var http = 'http://192.168.43.47:8081';
//var http = 'http://172.16.15.161:8081';
//var http = 'http://192.168.0.19:8081'
var http = 'http://192.68.185.29:8081'
var socket = io.connect(http,{'forceNew':true});
//var socket = io.connect('http://192.168.0.16:8081',{'forceNew':true});
//var socket = io.connect('http://172.16.9.250:8081',{'forceNew':true});
//var socket = io.connect('http://10.254.199.77:8081',{'forceNew':true});
//var socket = io.connect('209.182.218.174:8081',{'forceNew':true});
var dato2 = 0;
socket.on('resGetDispositive',function(dispositivos,id1) {
  dispositivo = dispositivos[0];
  if (dispositivo != undefined) {
    var html6 =`<h5 align="center"> Bicicleta ${dispositivo.id_Number} </h5>`
  }
  else {
    var html6 = `<h5 align="center"> Bicicleta no existe</h5>`
  }
document.getElementById('tit').innerHTML = html6;
  if (dato2 == dispositivo.id_Number){
  var vol = parseFloat(dispositivo.voltaje[dispositivo.voltaje.length-1]) +"V"
  var corr = parseFloat(dispositivo.corriente[dispositivo.corriente.length-1]) + "A"
  var temp = parseFloat(dispositivo.temperatura[dispositivo.temperatura.length-1]) + "°"
  var eco2 = parseFloat(dispositivo.co2[dispositivo.co2.length-1]) +"ppm"
  var hum = parseFloat(dispositivo.humedad[dispositivo.humedad.length-1]) +"%"
  var rssi = parseFloat(dispositivo.rssi[dispositivo.rssi.length-1]) +"dBm"
  console.log(vol)
  datadon = [
    {label:"CO2",value:eco2},
    {label:"Voltaje",value:vol},
    {label:"Humedad",value:hum},
    {label:"Temperatura",value:temp},
    {label:"Corriente",value:corr}
  ]
  morris1.setData(datadon);

  var html3 =`<h5 align="center"> RSSI: ${rssi} </h5>`
  document.getElementById('tit2').innerHTML = html3;


}
})

$("#bot").on("click",function(){
//  var id = 123456;
  dato2 =  document.getElementById('Disp').value
   socket.emit('getDispositive',dato2)
})
  gDonas();
  function gDonas(){
  morris1 = new Morris.Donut({
  element: 'voltaje',
  colors: ["#00a65a", "#f39c12", "#3c8dbc", "#dd4b39", "#555299","#F91919"],
  data: [
  {label: "Voltaje", value: 0 }],
  parseTime: false,
  resize: true,
  formatter: function(x){
    return x
  }
  });
  }
