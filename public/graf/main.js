var http = 'http://192.168.0.16:8081'
var socket = io.connect(http,{'forceNew':true});
id =  document.getElementById('Disp').value
co2 = []
socket.emit('getDispositive',id);
socket.on('resGetDispositive',function(dispositivos,id) {
  dispositivo = dispositivos[0];
  co2=[]
  fech =[]
  cont = 0
  for(var k=0;k<dispositivo.fecha.length;k++) {
   if(dispositivo.co2[k]>0){
     co2[cont]=dispositivo.co2[k];
     fech[cont] =dispositivo.fecha[k];
     cont=cont+1
    }
  }
  console.log(cont);
})
window.onload = function () {

var dps = []; // dataPoints
var chart = new CanvasJS.Chart("chartContainer", {
	title :{
		text: "Dynamic Data"
	},
	axisY: {
		includeZero: false
	},
	data: [{
		type: "line",
		dataPoints: dps
	}]
});

var xVal = 0;
var yVal = 100;
var updateInterval = 1000;
var dataLength = 50; // number of dataPoints visible at any point

var updateChart = function (count) {

	count = count || 1;

	for (var j = 0; j < count; j++) {
		yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
		dps.push({
			x: xVal,
			y: co2[xVal]
		});
		xVal++;
	}

	if (dps.length > dataLength) {
		dps.shift();
	}

	chart.render();
};

updateChart(dataLength);
setInterval(function(){updateChart()}, updateInterval);
}
