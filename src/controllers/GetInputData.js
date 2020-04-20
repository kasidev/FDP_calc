"use strict"

const moment = require("moment")
const momentTZ = require('moment-timezone')

let a = moment()
console.log(a.format(),"//moment().format()")
console.log(a.tz("America/Toronto").format())
console.log(a.utc().format())
console.log(moment.tz.names())


module.exports = GetInputData