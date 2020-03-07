//var http = 'http://209.182.218.174:8081';
//var http = 'http://192.168.0.16:8081'
///var http = 'http://192.168.43.47:8081';
// http = 'http://172.16.15.161:8081';
//var http = 'http://192.168.0.19:8081'
var http = 'http://192.68.185.29:8081'
var estado = 0
var bandera = 0
var socket = io.connect(http,{'forceNew':true});
var id =[]
$("#botDataB").on("click",function(){
  socket.emit('getDispositive3')
  var html = ""
  document.getElementById('Dispo').innerHTML = html;
  var html2 = ""
  document.getElementById('Dispo2').innerHTML = html2;

})
socket.on('resGetDispositive3',function(dispositivos) {
for (var i = 0; i < dispositivos.length; i++) {
  ids = dispositivos[i]
  id[i] = ids.id_Number
}
estado = 1;
document.getElementById('Bicis').innerHTML = id;
console.log(id)
})

$("#bDB").on("click",function(){
  dd =  document.getElementById('Dispos').value
  //socket.emit("prueba",dd)
  id = []
var html2 = `¿Está seguro?. Se borrarán todos los datos de la bicicleta ${dd}
<input value="Confirmar" onclick="borrarbic()" type="button" style="background:blue; color:white">`

var html = ""
document.getElementById('Dispo2').innerHTML = html2;
document.getElementById('Dispo').innerHTML = html;
document.getElementById('Bicis').innerHTML = html;

  })

function borrarbic(){
dd =  document.getElementById('Dispos').value
socket.emit("prueba",dd)
id = []
var html2 = `Dispositivo eliminado. Verifique bicicletas registradas`
var html = ""
document.getElementById('Dispo2').innerHTML = html2;
document.getElementById('Dispo').innerHTML = html;
document.getElementById('Bicis').innerHTML = html;
}



  $("#botDataC").on("click",function(){
    if(estado ==1){
    var id1 =  document.getElementById('Agr').value
    for (var i = 0; i < id.length; i++) {
      if(id1 == id[i]){
        bandera = 1;
      }
    }
    if (bandera != 1){
      var data = "id_number=" + id1
      //var data = "id_number=12";
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            console.log(this.responseText);
          }
        });

        xhr.open("POST", "http://192.68.185.29:8081/api/ecg");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data);
        console.log(estado)
        var html = `Dispositivo agregado, revise bicicletas registradas
        `
    }
    else {
    var html = `Dispositivo ya existe, revise bicicletas registradas`
    }
    }
    else {
      var html = `<i> Revisar bicicletas registradas para no repetir identificación <i>
        `
    }
    var html2 = ""
    document.getElementById('Dispo2').innerHTML = html2;
    document.getElementById('Bicis').innerHTML = html2;
    document.getElementById('Dispo').innerHTML = html;

    })
