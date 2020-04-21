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
        this.events = new EventEmitter()
}

GetInputData.prototype.startToLocal = function() {
    return new Promise ((resolve,reject)=>{
    console.log("input elements: ",this.input_elements)
    let fdpStart
    if (this.input_elements.tz === "UTC/ZULU") {
         fdpStart = "".concat(this.input_elements.fdpStartDate, " ",
         this.input_elements.fdpStartTime) 
         fdpStart = moment.tz(fdpStart,"YYYY-MM-DD hh:mm", "Etc/UTC" )
         dataTimes.fdpStartMoment=fdpStart
         //console.log(dataTimes)
    } else {
        fdpStart = "".concat(this.input_elements.fdpStartDate, " ",
         this.input_elements.fdpStartTime) 
         fdpStart = moment.tz(fdpStart,"YYYY-MM-DD hh:mm",
         this.input_elements.tz )
         dataTimes.fdpStartMoment=fdpStart
         //console.log(dataTimes)   
        
    }
    if (dataTimes.fdpStartMoment.isValid()) {
        resolve("inputDataProcessed")
        console.log("input fdp : ", dataTimes.fdpStartMoment.utc().format())
        
    } else {
        reject("error while processing input data")
        alert("Oops!! An error occured")
        
    }
})
}

GetInputData.prototype.getInput = function(){
    this.startToLocal()
        .then((value)=>{
            console.log(value)
            this.events.emit(value)
        })
}



module.exports = GetInputData