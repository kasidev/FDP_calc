"use strict"

const moment = require("moment")
const momentTZ = require('moment-timezone')
const EventEmitter = require("eventemitter3")
const dataTimes = require("../data/times.json")
const {on} = require("../utils/dom")
const aiportsTz=require("../data/airportsTz.json")




function Split(){
        this.events = new EventEmitter()
}

Split.prototype.calculate = function(exceptionValues){
    let duration
    if(exceptionValues.splitStart){
        console.log("calculate Split duty: ",exceptionValues)
        duration = 
        exceptionValues.splitEnd.diff(exceptionValues.splitStart, 'minutes')
        

        if(duration>=180){
            return duration
        }else if(duration<0){
            alert("Check split duty start/end input")
        }
    }
    duration =0
    return duration
}

module.exports = Split