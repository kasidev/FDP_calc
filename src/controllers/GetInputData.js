"use strict"

const moment = require("moment")
const momentTZ = require('moment-timezone')
const EventEmitter = require("eventemitter3")
const dataTimes = require("../data/times.json")


/**
 * @param {JSON} input_Elements
 */
function GetInputData(input_elements){
        this.input_elements = input_elements
}


GetInputData.prototype.startToLocal = function(){
    console.log("input elements: ",this.input_elements)
    let fdpStart
    if (this.input_elements.tz === "UTC/ZULU") {
         fdpStart = "".concat(this.input_elements.fdpStartDate, " ",
         this.input_elements.fdpStartTime) 
         fdpStart = moment.tz(fdpStart,"YYYY-MM-DD hh:mm", "Etc/UTC" )
         dataTimes.fdpStartUTC=fdpStart 
    } else {
        fdpStart = "".concat(this.input_elements.fdpStartDate, " ",
         this.input_elements.fdpStartTime) 
         fdpStart = moment.tz(fdpStart,"YYYY-MM-DD hh:mm",
         this.input_elements.tz )
         dataTimes.fdpStartMoment=fdpStart  
         
        
    }
    console.log("input fdp : ", dataTimes.fdpStartMoment.utc().format())
}




module.exports = GetInputData