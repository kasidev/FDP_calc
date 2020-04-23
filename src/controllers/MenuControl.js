"use strict"

const moment = require("moment")
const momentTZ = require('moment-timezone')
const EventEmitter = require("eventemitter3")
const {on} = require("../utils/dom")
const aiportsTz=require("../data/airportsTz.json")
const airportTemplate=require("../templates/airportAutocomplete.ejs")
const airportListTemplate=require("../templates/airportList.ejs")


/**
 * @param {JSON} input_Elements
 * @param {HTMLTableElement} arrTable
 * @param {HTMLTableElement} depTable
 */

function MenuControl(input_elements,depTable,arrTable){
        this.input_elements = input_elements
        this.arrTable = arrTable
        this.depTable = depTable
        this.events = new EventEmitter()

}

MenuControl.prototype.init=function(){
    document.getElementById("standbystarttimeInputGroup").style.display='none'
    document.getElementById("splitInputGroup").style.display='none'
    //document.getElementById("arrivalLocationInput").addEventListener()
    on(".input-arrAirport", "keyup", (event) => {
        /**@type {string} */
        const term = event.handleObj.value
        this.apLookup(term,this.arrTable)
      })
    on(".input-depAirport", "keyup", (event) => {
        /**@type {string} */
        const term = event.handleObj.value
        this.apLookup(term,this.depTable)
      })
    on(".airportAutocompleteRows","click",(event)=>{
        const selectedIcao = event.handleObj.dataset.icao
        if(event.handleObj.dataset.table==="arrTable"){
            this.input_elements.arr.value=selectedIcao
            for(let i = this.arrTable.rows.length - 1; i >= 0; i--)
            {
                this.arrTable.deleteRow(i);
            }
        }else if(event.handleObj.dataset.table==="depTable"){
            this.input_elements.dep.value=selectedIcao
            for(let i = this.depTable.rows.length - 1; i >= 0; i--)
            {
                this.depTable.deleteRow(i);
            }
        }
    })
    

}

MenuControl.prototype.apLookup=function(term,apTable){
    //console.log(term)

    for(let i = apTable.rows.length - 1; i >= 0; i--)
        {
            apTable.deleteRow(i);
        }

    if(term.length === 0 || term.length<3) {
        matches=[]
        return
    }
    let matches = aiportsTz.filter((airport)=>{
        const regex = new RegExp(`^${term}`,`gi`)
        if (airport.iata){
            //console.log(airport.iata)
            return airport.iata.match(regex) || airport.icao.match(regex)

        }
    })
    
    if(matches.length>0){
        for (const airport of matches) {
            const airportHtml=airportTemplate({
                iataCode: airport.iata,
                icaoCode: airport.icao,
                tableName: apTable.id
            })
            apTable.insertAdjacentHTML("beforeend",airportHtml)
        }
        

    }

}

module.exports = MenuControl