"use strict"

const moment = require("moment")
const momentTZ = require('moment-timezone')
const EventEmitter = require("eventemitter3")
const dataTimes = require("../data/times.json")
const {on} = require("../utils/dom")
const aiportsTz=require("../data/airportsTz.json")


/**
 * @param {moment}
 *
 */

function Standby(standbyStart){
        this.events = new EventEmitter()
}

Standby.prototype.calculate = function(exceptionValues){
    if(exceptionValues.stdbStart){
        console.log("standby start:",specials.standbyStart)
        const checkIn=dataTimes.fdpStartMoment
        

    }
    
}

module.exports = Standby