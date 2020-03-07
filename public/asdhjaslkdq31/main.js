//var http = 'http://192.168.0.16:8081'
var http = 'http://192.68.185.29:8081'
//var http = 'http://209.182.218.174:8081';

//var http = 'http://172.16.13.60:8081';
//var http = 'http://172.16.15.161:8081';
//var http = 'http://192.168.0.19:8081'

var x = location.href;
var socket = io.connect(http,{'forceNew':true});
var estado=1;

    var html2 = `


    <H1 align="center"> <i> Sistema de Monitoreo Bicicletas Campus Verde </i></H1>

    <div class="container" align="center">


    <button type ="button" id="Pos"class="btn btn-primary" onclick= "location.href='Pd15asfkbkaptr'"
    style='width:200px; height:70px; background:red'>Tracking </button> &nbsp;


    	<button type ="button" id="BdD"class="btn btn-primary" onclick= "location.href='NaksdjaASAJas1238'"
      style='width:200px; height:70px; background:red' >Trayectorias </button>  &nbsp;
      <button type ="button" id="Co2"class="btn btn-primary" onclick= "location.href='KA12Nnasdllmt'"
      style='width:200px; height:70px; background:red' >Co2 </button>
      <br><br>
      <button type ="button" id="Sens"class="btn btn-primary" onclick= "location.href='PnQ983nuyghy'"
      style='width:200px; height:70px; background:red' >Sensores</button> &nbsp;
      <button type ="button" id="Sens"class="btn btn-primary" onclick= "location.href='MiRkjPjasdn32th'"
      style='width:200px; height:70px; background:red' >Cobertura Gateway</button> &nbsp;
      <button type ="button" id="Sens"class="btn btn-primary" onclick= "location.href='Lktioq10Nbtyi'"
      style='width:200px; height:70px; background:red' >RSSI</button>
    </div>
    `
  document.getElementById('Sesion').innerHTML = html2;

//***************SERVIDOR***
