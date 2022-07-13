const Sensor = require("../models/sensor")
const createSensors =async(data)=>{
    return await Sensor.insertMany(data)
}

