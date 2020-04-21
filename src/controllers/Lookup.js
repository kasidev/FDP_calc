"use strict"

const moment = require("moment")
const momentTZ = require('moment-timezone')
const EventEmitter = require("eventemitter3")
const dataTimes = require("../data/times.json")
const {on} = require("../utils/dom")
const aiportsTz=require("../data/airportsTz.json")


/**
 * @param {JSON} input_Elements
 * @param {HTMLButtonElement} buttonElement
 */

function Lookup(input_elements,buttonElement){
        this.input_elements = input_elements
        this.events = new EventEmitter()

}

Lookup.prototype.lookupMax=function(){
    
    let departureTz
    for (const airport of aiportsTz){
        if (airport.icao === this.input_elements.dep){
            departureTz=airport.tz
        }
    }
    console.log("departure tz: ",departureTz)
    /**@type {moment}  */
    let checkIn=dataTimes.fdpStartMoment.tz("Europe/Zurich")
    console.log("Check In Time [LT] :",checkIn.format())

    let checkInInt
    checkInInt=checkIn.hour()*60
    checkInInt+=checkIn.minute()
    console.log("checkin as int minutes: ",checkInInt)
}
module.exports = Lookup