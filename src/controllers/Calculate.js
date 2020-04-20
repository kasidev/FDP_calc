"use strict"

const moment = require("moment")
const momentTZ = require('moment-timezone')
const EventEmitter = require("eventemitter3")
const dataTimes = require("../data/times.json")
const {on} = require("../utils/dom")


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
        this.events.emit("startCalculation")
        console.log("calculate button clicked")
    })
}
module.exports = Calculate