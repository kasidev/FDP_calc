"use strict"

const moment = require("moment")
const momentTZ = require('moment-timezone')
const EventEmitter = require("eventemitter3")
const dataTimes = require("../data/times.json")
const {on} = require("../utils/dom")
const aiportsTz=require("../data/airportsTz.json")
const easaFTL = require("../data/easaFTL_83_2014.json")


/**
 * @param {JSON} input_Elements
 * @param {HTMLButtonElement} buttonElement
 */

function Lookup(input_elements,buttonElement){
        this.input_elements = input_elements
        this.events = new EventEmitter()

}

Lookup.prototype.lookupMax=function(fdpStart){
    
    let departureTz
    for (const airport of aiportsTz){
        if (airport.icao === this.input_elements.dep.value){
            departureTz=airport.tz
        }
    }
    console.log("departure tz: ",departureTz)
    /**@type {moment}  */
    let checkIn=fdpStart.tz(departureTz)
    console.log("Check In Time [LT] :",checkIn.format())

    let checkInInt
    checkInInt=checkIn.hour()*60
    checkInInt+=checkIn.minute()
    console.log("checkin as int minutes: ",checkInInt)
    let legs = parseInt(this.input_elements.legs.value,10)
    if (legs===1) {
        legs = 2
    }
    
//iterate through easa ftl json to find the maximum flight duty period
//in minutes
    for (const section of easaFTL) {
        if (section.start){
            if (checkInInt>=section.start && checkInInt <=section.end) {
               console.log("section found: ",section)
               for (const values of section.fdp_list) {
                   if (legs===values.max_sectors) {
                       console.log("max fdp [min]: ",values.max_fdp)
                       
                       document.getElementById("maxFdp").innerText=
                       moment.duration(values.max_fdp,"minutes").hours() + " hours "+
                        moment.duration(values.max_fdp,"minutes").minutes() + " minutes"

                       let maxFDP = values.max_fdp
                       this.events.emit("lookupCompleted",maxFDP)                 
                   }                   
               }
            }
        }      
    }
}

module.exports = Lookup