
const ECG = require ('../models/signalECG')
function creardispositivo(req,res){

    const nuevodispositivo = new ECG ({
      id_Number : req.body.id_number,
      datos : [],
      fecha : []
    })

    nuevodispositivo.save((err)=>{
        if(err) return res.status(500).send({message:`Error al crear dispositivo:${err}`})
        return res.status(201).send({message:'dispositivo creado correctamente'})
    })
}

function getDispositivos(req,res){

    ECG.find({},function(err,dispositivos){
      if(err) return res.status(500).send({message:`Error al mostrar dispositivo:${err}`})
      return res.status(200).send(dispositivos)
    })
}

function updatedato(dispositivo,next){
//console.log(dispositivo.payload_fields.lat)
//console.log(dispositivo.metadata.gateways[0]["rssi"])
//console.log(dispositivo.metadata.gateways)

var rssia =[]
var gtwid =[]
for (var i = 0; i < dispositivo.metadata.gateways.length; i++) {
       rssia[i] = dispositivo.metadata.gateways[i]["rssi"]
       gtwid[i] = dispositivo.metadata.gateways[i]["gtw_id"]
}
var rssi = Math.max(...rssia);
var ind = rssia.indexOf(rssi);
if(gtwid[ind]=='eui-b827ebfffe7ba925'){
  var gateway = 1  //CENTRO
}
if(gtwid[ind]=='eui-b827ebfffeb09a77'){
  var gateway = 2 //TOROBAJO
}
if(gtwid[ind]=='eui-b827ebfffeaaee11'){
  var gateway = 3 //VIPRI
}

//console.log(rssi, gtwid[ind])
      var dispositivo = dispositivo.payload_fields
      var iddispositivo = dispositivo.id_Number
      var lat = dispositivo.lat
      var lon = dispositivo.lon
      var vol = dispositivo.voltaje
      var corr = dispositivo.corriente
      var co2 = dispositivo.co2
      var temp = dispositivo.temperatura
      var hum = dispositivo.humedad

      ECG.findOne({id_Number:iddispositivo},(err,dispositivo)=>{
        if(err)return next ({ message:`Error al editar la base de datos ${err}`})

        // dispositivo.datos.push(dato)
      // dispositivo.datos.push.apply(dispositivo.datos,dato)
      var d = new Date(Date.now());
      if(d.getHours()>=5 && d.getHours()<=20){
       dispositivo.lat.push.apply(dispositivo.lat,lat)
       dispositivo.lon.push.apply(dispositivo.lon,lon)
       dispositivo.voltaje.push.apply(dispositivo.voltaje,vol)
       dispositivo.corriente.push.apply(dispositivo.corriente,corr)
       dispositivo.co2.push.apply(dispositivo.co2,co2)
       dispositivo.temperatura.push.apply(dispositivo.temperatura,temp)
       dispositivo.humedad.push.apply(dispositivo.humedad,hum)
       dispositivo.rssi.push(rssi)
       dispositivo.gateway.push(gateway)

        var n = d.toLocaleString();
        dispositivo.fecha.push(n);
        dispositivo.save(function (err,res){
          if(err) return console.log('No se pudo')
          console.log ('Dato actualizado');
        //  console.log(d.getHours())

        });

       return next(dispositivo)
       }
    })

}

/*
function deletedato(dispositivo,next){
      var iddispositivo = dispositivo.id_Number
      //var dato = dispositivo.datos
      //ECG.findOne({_id: "5d40d300fbfed32f70a990a2"},(err,dispositivo)=>{
      ECG.findOne({id_Number:iddispositivo},(err,dispositivo)=>{
        if(err)return next ({ message:`Error al editar la base de datos ${err}`})

           //dispositivo.fecha.splice(2,1)
          //dispositivo.datos=[]
          dispositivo.fecha=[]
          dispositivo.lat=[]
          dispositivo.lon=[]
          dispositivo.voltaje=[]
          dispositivo.corriente=[]
          dispositivo.co2=[]
          dispositivo.temperatura=[]
          dispositivo.humedad=[]

           //dispositivo.datos.splice(2,1)
        dispositivo.save(function (err,res){
          if(err) return console.log('No se pudo')
          console.log ('Dato borrado');

        });

       return next(dispositivo)
    })
}
*/
function deletedato2(data,next){

      var iddispositivo = data
      //ECG.findOne({_id: "5d40d300fbfed32f70a990a2"},(err,dispositivo)=>{
      ECG.findOne({id_Number:iddispositivo},(err,dispositivo)=>{
        if(err)return next ({ message:`Error al editar la base de datos ${err}`})

           //dispositivo.fecha.splice(2,1)
          //dispositivo.datos=[]

          dispositivo.fecha=[]
          dispositivo.lat=[]
          dispositivo.lon=[]
          dispositivo.voltaje=[]
          dispositivo.corriente=[]
          dispositivo.co2=[]
          dispositivo.temperatura=[]
          dispositivo.humedad=[]
          dispositivo.rssi = []
          dispositivo.gateway = []
           //dispositivo.datos.splice(2,1)
        dispositivo.save(function (err,res){
          if(err) return console.log('No se pudo')
          console.log ('Dato borrado');

        });

       return next(dispositivo)
    })
}

function borrardispositivo(data,next){
var iddispositivo = data


ECG.findOne({id_Number:iddispositivo},(err,dispositivo)=>{
  if(err)return next ({ message:`Error al editar la base de datos ${err}`})
  //console.log(dispositivo)
  if(dispositivo != null){
  dispositivo.delete(function (err,res){
  if(err) return console.log('No se pudo')
  console.log ('Dato borrado');
  });
  return next(dispositivo)
  }

  })

}

module.exports ={
  creardispositivo, updatedato,
  getDispositivos ,  deletedato2, borrardispositivo
}
