var express= require ('express');
var app = express();
const bodyParser = require('body-parser');
var server=require('http').Server(app);
var io=require('socket.io')(server);
var mongoose = require('mongoose');
var id1;
var ttn = require('ttn');
var appId = 'b1j9j9i8e4g6f5c2b1';
var accessKey = 'ttn-account-v2.Qu0YFpSZUDxScF0ZqvmonxungzV-vMVsyIrSYWXwoVM';
var dispositivo
var client = new ttn.DataClient(appId, accessKey, 'us-west.thethings.network:1883');
const api = require('../routes')
const DispositiveCtrl = require('../controllers/signalECG')
const ECG = require ('../models/signalECG')
var messages =[{
  id: 1,
  text:"Hola todos",
  author:"0"
}];
var estado=0;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use("/newPage",express.static(__dirname + "/public/newPage"));
app.use("/newPage2",express.static(__dirname + "/public/newPage2"));
app.use("/newPage3",express.static(__dirname + "/public/newPage3"));

app.get('/',function (req,res){

  res.status(200).send("Hola");
});

app.use('/api',api)

mongoose.connect('mongodb://localhost:27017/Electro',function(err,res){
    if(err){
      return console.log(`Error al conectar a la base de datos:${err}`);
    }
    console.log('Conexion a la base de datos establecida')
})






io.on('connection',function(socket){
    console.log('Alguien se ha conectado con sockets');
    socket.emit('messages',messages);

    client.on("uplink", function (devID, payload) {

    if (payload.payload_fields != undefined){
    var pr = payload.payload_fields.lat;
            if(dispositivo != payload){
            if(pr != 0){
            console.log("* Received uplink from*** ", devID)
            dispositivo = payload


            DispositiveCtrl.updatedato(dispositivo,(newdispositivo)=>{
            socket.broadcast.emit('Datoañadido',newdispositivo);

           })

          }
         }
       }
    //console.log(payload.metadata)
    //var gtw = payload.metadata.gateways[0]["rssi"]
    //console.log(gtw)
    })


/*
socket.on('new-message',function(data) {
     messages.push(data);
     io.sockets.emit('messages',messages);
     console.log(data);
});

socket.on('new-message2',function(data) {
     messages2.push(data);
     io.sockets.emit('messages2',messages2);
     console.log(messages2);

}); // evento creado
*/
socket.on('MCUEvent',function(data) {
     //console.log(data);
     //io.sockets.emit('MCUEventClient',data);
    socket.broadcast.emit('MCUEventClient',data);
});
/*
socket.on('SignalEvent',function(dispositivo) {
     DispositiveCtrl.deletedato(dispositivo,(newdispositivo)=>{
     })
});
*/

  socket.on('getDispositive',function(id){
      ECG.find({id_Number:id},function(err,dispositivos){
          if(err) return console.log({message:`Error al mostrar dispositivo:${err}`})
          return io.sockets.emit('resGetDispositive',dispositivos,id);
      })
  })

  socket.on('getDispositive2',function(id,fecha){
      ECG.find({id_Number:id},function(err,dispositivos){
          if(err) return console.log({message:`Error al mostrar dispositivo:${err}`})
          return io.sockets.emit('resGetDispositive2',dispositivos,fecha);
      })
  })

  socket.on('getDispositive3',function(){
      ECG.find({},function(err,dispositivos){
          if(err) return console.log({message:`Error al mostrar dispositivo:${err}`})
          return io.sockets.emit('resGetDispositive3',dispositivos);
      })
  })

socket.on('prueba',function(data){
      console.log("prueba")
/*
      DispositiveCtrl.deletedato2(data,(newdispositivo)=>{
      })
*/      
      DispositiveCtrl.borrardispositivo(data,(newdispositivo)=>{
      })


})
/*socket.on('prueba2',function(x,y){
    console.log([x, y])
    socket.broadcast.emit('PMapa',x,y);
});
*/
socket.on('Basedatos',function(dispositivo) {
      console.log(dispositivo);
      // socket.broadcast.emit('Datoañadido',dispositivo)
       DispositiveCtrl.updatedato(dispositivo,(newdispositivo)=>{
       socket.broadcast.emit('Datoañadido',newdispositivo);
      })
});
//console.log(client)
//client.on('uplink', function (msg) { console.log('Received message', msg);});



})





server.listen(8081,function(socket){

 console.log('Servidor corriendo en http://localhost:8081');

});
