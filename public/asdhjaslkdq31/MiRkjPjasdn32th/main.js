//var http = 'http://209.182.218.174:8081';
//var http = 'http://192.168.0.16:8081'
//var http = 'http://172.16.7.170:8081';
var http = 'http://192.68.185.29:8081'
//var http = 'http://192.168.43.47:8081';
//var http = 'http://172.16.15.161:8081';
//var http = 'http://192.168.0.19:8081'
var socket = io.connect(http,{'forceNew':true});
//var socket = io.connect('http://192.168.0.16:8081',{'forceNew':true});
//var socket = io.connect('http://172.16.9.250:8081',{'forceNew':true});
var latitud=[]
var longitud=[]
var co2=[]
var rssi=[]
var idgateway=[]

$("#bot").on("click",function(){
//  var id = 123456;
  //var fecha = new Date('September 11, 2019');
  var id =  document.getElementById('Disp').value
  var fecha = document.getElementById('start').value
  //dia = fecha.getDate()
  //console.log(id)
  //console.log(fecha)
    socket.emit('getDispositive2',id,fecha)
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
