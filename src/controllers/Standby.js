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

Standby.prototype.calculate = function(specials){
    if(specials.stdbCheck&&specials.stdbStart){
        console.log("standby start:",specials.standbyStart)
        alert("the calculation of standby duty is not implemented yet")
    }
    
}

module.exports = Standby