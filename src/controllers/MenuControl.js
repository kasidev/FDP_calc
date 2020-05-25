"use strict"

const moment = require("moment")
const momentTZ = require('moment-timezone')
const EventEmitter = require("eventemitter3")
const {on} = require("../utils/dom")
const aiportsTz=require("../data/airportsTz.json")
const airportTemplate=require("../templates/airportAutocomplete.ejs")
const timezoneTemplate=require("../templates/timeZoneAutocomplete.ejs")
/*const airportListTemplate=require("../templates/airportList.ejs")*/
const timeZonesData = require("../data/timeZones.json")


/**
 * @param {JSON} input_Elements
 * @param {HTMLTableElement} arrTable
 * @param {HTMLTableElement} depTable
 */

function MenuControl(input_elements,depTable,arrTable,tzTable){
        this.input_elements = input_elements
        this.arrTable = arrTable
        this.depTable = depTable
        this.tzTable = tzTable
        this.events = new EventEmitter()

}

MenuControl.prototype.init=function(){
    document.getElementById("standbystarttimeInputGroup").classList.toggle("d-none")
    document.getElementById("splitInputGroup").classList.toggle("d-none")
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

    on(".input-tz", "keyup", (event) => {
        /**@type {string} */
        const term = event.handleObj.value
        this.tzLookup(term,this.tzTable)
        console.log("term: ", term)
      })
    
    on(".standbyInputCheck", "click", (event) => {
        if(event.handleObj.checked){
            document.getElementById("standbystarttimeInputGroup").classList.remove("d-none")}
        else{
            document.getElementById("standbystarttimeInputGroup").classList.add("d-none")
        }

    }) 

      on(".splitdutyCheck", "click", (event) => {
        if(event.handleObj.checked){
            document.getElementById("splitInputGroup").classList.remove("d-none")
            this.input_elements.splitStartD.value=this.input_elements.fdpStartDate.value
            this.input_elements.splitEndD.value=this.input_elements.fdpStartDate.value
        }
        else{
            document.getElementById("splitInputGroup").classList.add("d-none")
        }
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

    on(".TimezoneAutocompleteRows","click",(event)=>{
        const timeZoneName = event.handleObj.dataset.tzname
        this.input_elements.tz.value=timeZoneName

        for(let i = this.tzTable.rows.length - 1; i >= 0; i--)
            {
                this.tzTable.deleteRow(i);
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
        const regex = new RegExp(`${term}`,`gi`)
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

MenuControl.prototype.tzLookup=function(term,tzTable){
    //console.log(term)

    let tzmatches =[]

    for(let i = tzTable.rows.length - 1; i >= 0; i--)
        {
            tzTable.deleteRow(i);
        }

    if(term.length === 0 || term.length<3) {
        tzmatches=[]
        return
    }
    
    tzmatches = timeZonesData.filter((timezone)=>{
        const regex = new RegExp(`${term}`,`gi`)
        if (timezone.name){
            /*console.log(timezone.name)*/
            return timezone.name.match(regex)
        }
    })

    
    if(tzmatches.length>0){
        console.log("matches", tzmatches)
        for (const timezone of tzmatches) {
            const timezoneHtml=timezoneTemplate({
                tzName: timezone.name,
                tzAbbr: timezone.abbrs[0],
                tableName: tzTable.id
            })
            tzTable.insertAdjacentHTML("beforeend",timezoneHtml)
        }
        

    }

}

module.exports = MenuControl