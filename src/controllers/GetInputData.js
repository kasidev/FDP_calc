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
    //console.log("input elements: ",this.input_elements)
    //console.log(document.getElementById("standbyInput").checked)
    let fdpStart
    if (this.input_elements.tz.value === "UTC/ZULU") {
         fdpStart = "".concat(this.input_elements.fdpStartDate.value, " ",
         this.input_elements.fdpStartTime.value) 
         fdpStart = moment.tz(fdpStart,"YYYY-MM-DD hh:mm", "Etc/UTC" )
         dataTimes.fdpStartMoment=fdpStart
         //console.log(dataTimes)
    } else {
        fdpStart = "".concat(this.input_elements.fdpStartDate.value, " ",
         this.input_elements.fdpStartTime.value) 
         fdpStart = moment.tz(fdpStart,"YYYY-MM-DD hh:mm",
         this.input_elements.tz.value )
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


GetInputData.prototype.getMoment = function(time,date,tz){
    let momentValue
    if (tz === "UTC/ZULU") {
        momentValue= "".concat(date, " ",time) 
        momentValue = moment.tz(momentValue,"YYYY-MM-DD hh:mm", "Etc/UTC" )

    } else {
        momentValue = "".concat(date, " ",time) 
        momentValue = moment.tz(momentValue,"YYYY-MM-DD hh:mm",tz )       
    }
    return momentValue
}

GetInputData.prototype.getInput = function(){
    const exceptionValues ={}
    if(this.input_elements.stdb.checked){
        const stdbStart = this.getMoment(
            this.input_elements.stdbStart.value,
            this.input_elements.fdpStartDate.value,
            this.input_elements.tz.value)
        exceptionValues.stdbStart=stdbStart
    }

    if(this.input_elements.split.checked){
        const splitStart = this.getMoment(
            this.input_elements.splitStartT.value,
            this.input_elements.splitStartD.value,
            this.input_elements.tz.value)
        const splitEnd = this.getMoment(
            this.input_elements.splitEndT.value,
            this.input_elements.splitEndD.value,
            this.input_elements.tz.value)
        exceptionValues.splitStart=splitStart
        exceptionValues.splitEnd=splitEnd
    }
    this.startToLocal()
        .then((value)=>{
            console.log(value)
            this.events.emit(value,exceptionValues)
        })
}



module.exports = GetInputData