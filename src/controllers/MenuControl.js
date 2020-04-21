"use strict"

const moment = require("moment")
const momentTZ = require('moment-timezone')
const EventEmitter = require("eventemitter3")
const {on} = require("../utils/dom")
const aiportsTz=require("../data/airportsTz.json")


/**
 * @param {JSON} input_Elements
 * @param {HTMLButtonElement} buttonElement
 */

function MenuControl(input_elements){
        this.input_elements = input_elements
        this.events = new EventEmitter()

}

MenuControl.prototype.init=function(){
    document.getElementById("standbystarttimeInputGroup").style.display='none'
    document.getElementById("splitInputGroup").style.display='none'

}

module.exports = MenuControl