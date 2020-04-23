"use strict"

const moment = require("moment")
const momentTZ = require('moment-timezone')
const EventEmitter = require("eventemitter3")
const dataTimes = require("../data/times.json")
const {on} = require("../utils/dom")
const aiportsTz=require("../data/airportsTz.json")


/**
 * @param {moment} splitStart
 * @param {moment} splitEnd
 */

function Split(){
        this.events = new EventEmitter()
}

Split.prototype.calculate = function(specials){
    if(specials.splitCheck){
        console.log("calculate Split duty")
        alert("the calculation of split duty is not implemented yet")
    }
}

module.exports = Split