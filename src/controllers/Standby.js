"use strict"

const moment = require("moment")
const momentTZ = require('moment-timezone')
const EventEmitter = require("eventemitter3")
const dataTimes = require("../data/times.json")
const {on} = require("../utils/dom")
const aiportsTz=require("../data/airportsTz.json")


/**
 * @param {moment}
 *
 */

function Standby(standbyStart){
        this.events = new EventEmitter()
}

/**
 * Calculation the reduction of the maximum flight duty period
 * according to EASA CS FTL.1.225 b) Standby other than airport standby
 * 
 */
 
Standby.prototype.calculate = function(fdpStart,exceptionValues){
    if(exceptionValues.stdbStart){
        let standbyDeduction

        const standbyDuration =  
        fdpStart.diff(exceptionValues.stdbStart, 'minutes')

        console.log("standby start log:",standbyDuration)
        

        if(standbyDuration<=360){
            standbyDeduction=0
            return standbyDeduction
        }
        if(standbyDuration>360 && !exceptionValues.splitStart){
            standbyDeduction=standbyDuration-360
            
            return standbyDeduction
        }
        if(standbyDuration<=480 && exceptionValues.splitStart){
            standbyDeduction=0
            return standbyDeduction
        }
        if(standbyDuration>480 && exceptionValues.splitStart){
            standbyDeduction=standbyDuration-480
            return standbyDeduction
        }    

    }
    
}

module.exports = Standby