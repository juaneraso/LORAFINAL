//*******************
//var http = 'http://192.168.0.16:8081'
//var http = 'http://209.182.218.174:8081';
//var http = 'http://172.16.13.60:8081';
//var http = 'http://192.168.0.19:8081'

var http = 'http://192.68.185.29:8081'
var socket = io.connect(http,{'forceNew':true});
var estado=1;
//var socket = io.connect('http://172.16.10.27:8081',{'forceNew':true});



  function Login(){
  var done=0;
  var usuario=document.login.usuario.value;
  var password=document.login.password.value;
  if (usuario=="Robotica" && password=="Udenar2019") {

  window.location="/asdhjaslkdq31";
  }
}
