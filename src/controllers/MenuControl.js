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
    //document.getElementById("arrivalLocationInput").addEventListener()
    on(".input-arrAirport", "keyup", (event) => {
        const term = event.handleObj.value
        this.apLookup(term)
      })
    

}

MenuControl.prototype.apLookup=function(term){
    console.log(term)
    /*let matches = aiportsTz.filter((airport)=>{
        const regex = new RegExp(`^${term}`,`gi`)
        return airport.iata.match(regex)
    })*/
    let matches = aiportsTz.filter((airport)=>{
        const regex = new RegExp(`^${term}`,`gi`)
        if (airport.iata){
            //console.log(airport.iata)
            return airport.iata.match(regex) || airport.icao.match(regex)

        }
    })
    console.log("matches",matches)

}

module.exports = MenuControl