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

function Calculate(input_elements,buttonElement){
        this.input_elements = input_elements
        this.buttonElement=buttonElement
        this.events = new EventEmitter()

}

Calculate.prototype.init = function() {
    this.buttonElement.addEventListener("click",(event)=>{
        event.preventDefault()
        //event.cancelBubble=true
        //event.stopPropagation()
        console.log("calculate button clicked")
        this.events.emit("startCalculation")
    })
}

Calculate.prototype.eta=function(maxFDP){
    /**@type {moment} */
    const momentEta=dataTimes.fdpStartMoment.add(maxFDP,'minutes')
    console.log("latest ETA [z]: ",momentEta.utc().format())
    document.getElementById("etaZULU").innerText=momentEta.utc()
        .format('DDMMM HH:mm z')

    //calculate estimated time of arrival in local time of arrival airport
    let arrivalTz
    for (const airport of aiportsTz){
        if (airport.icao === this.input_elements.arr.value){
            arrivalTz=airport.tz
        }
    }
    console.log("latest ETA [LT]: ",momentEta.tz(arrivalTz).format())
    document.getElementById("etaLT").innerText=momentEta.tz(arrivalTz)
        .format('DDMMM HH:mm zz')
    document.getElementById("etaTz").innerText=arrivalTz
    document.getElementById("etaHeader").scrollIntoView()
}
module.exports = Calculate