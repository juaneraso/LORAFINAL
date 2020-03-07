const express = require ('express')
const DispositiveCtrl = require('../controllers/signalECG')
const api = express.Router()

api.post('/ecg',DispositiveCtrl.creardispositivo)
api.get('/ecg',DispositiveCtrl.getDispositivos)

module.exports= api
