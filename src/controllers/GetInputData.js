"use strict"

const moment = require("moment")
const momentTZ = require('moment-timezone')
const EventEmitter = require("eventemitter3")
/*
 * @param {HTMLInputElement} input_tz
 * @param {HTMLInputElement} input_standby
 * @param {HTMLInputElement} input_standby_start
 * @param {HTMLInputElement} input_standby_end
 * @param {HTMLInputElement} input_fdp_start_dat
 * @param {HTMLInputElement} input_fdp_start_tim
 * @param {HTMLInputElement} input_legs
 * @param {HTMLInputElement} input_dep
 * @param {HTMLInputElement} input_arr
 * @param {HTMLInputElement} input_split
 * @param {HTMLInputElement} input_split_start
 * @param {HTMLInputElement} input_split_end
*/

/**
 * @param {JSON} input_Elements
 */
function GetInputData(input_elements){
        this.input_elements = input_elements
}

GetInputData.prototype.startToLocal = function(){
    console.log(this.input_elements)
}
/*
let a = moment()
console.log(a.format(),"//moment().format()")
console.log(a.tz("America/Toronto").format())
console.log(a.utc().format())
console.log(moment.tz.names())
*/



module.exports = GetInputData