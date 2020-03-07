//var http = 'http://209.182.218.174:8081';
//var http = 'http://192.168.0.16:8081'
//var http = 'http://172.16.15.161:8081';
//var http = 'http://192.168.0.19:8081'

var http = 'http://192.68.185.29:8081'
var socket = io.connect(http,{'forceNew':true});
//var socket = io.connect('http://172.16.9.250:8081',{'forceNew':true});
var latitud=[]
var longitud=[]
var co2=[]
var fecha
var id
$("#bot").on("click",function(){
//  var id = 123456;
  id =  document.getElementById('Disp').value
  fecha = document.getElementById('start').value
  socket.emit('getDispositive2',id,fecha)
  console.log(fecha)
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

function addZero(i) {
if (i < 10) {
  i = "0" + i;
}
return i;
}
