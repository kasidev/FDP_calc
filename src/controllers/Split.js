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

function Split(splitStart,splitEnd){
        this.events = new EventEmitter()
}

Split.prototype.calculate = function(SplitStart){
    console.log("Split start:",SplitStart)
}

module.exports = Split