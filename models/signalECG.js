const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ECGSchema = new Schema ({
  id_Number : Number,
  lat :[Number],
  lon:[Number],
  voltaje:[Number],
  corriente:[Number],
  co2:[Number],
  temperatura:[Number],
  humedad:[Number],
  rssi:[Number],
  gateway:[Number],
  fecha : []
})

module.exports = mongoose.model('Modelo',ECGSchema)
