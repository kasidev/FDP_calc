"use strict"
require("../scss/index.scss")

const GetInputData = require("./controllers/GetInputData")
const Calculate = require("./controllers/Calculate")
const Lookup = require("./controllers/Lookup")
const MenuControl = require("./controllers/MenuControl")
const dataTimes = require("./data/times.json")
const Standby = require("./controllers/Standby")
const Split = require("./controllers/Split")

let input_data=  {
    "regulation" : document.getElementById("regulationInput"),
    "tz" : document.getElementById("timezoneInput"),
    "stdb" : document.getElementById("standbyInput"),
    "stdbStart" : document.getElementById("standbystarttimeInput"),
    "fdpStartDate" : document.getElementById("fdpstartDateInput"),
    "fdpStartTime": document.getElementById("fdpstartTimeInput"),
    "legs" : document.getElementById("legsInput"),
    "dep" : document.getElementById("departureLocationInput"),
    "arr" : document.getElementById("arrivalLocationInput"),
    "split" : document.getElementById("splitdutyInput"),
    "splitStartT" : document.getElementById("splitdutystartInputTime"),
    "splitStartD" : document.getElementById("splitdutystartInputDate"),
    "splitEndT" : document.getElementById("splitdutyendInputTime"),
    "splitEndD" : document.getElementById("splitdutyendInputDate"),
    "splitD1"   : document.getElementById("splitdutyOvernight")
}

const getInputData = new GetInputData(input_data)

const lookup = new Lookup(input_data)

//getInputData.startToLocal()

const calculate = new Calculate(input_data,
    document.getElementById("calculateButton"))

calculate.init()

const menuControl = new MenuControl(
    input_data,
    document.getElementById("depTable"),
    document.getElementById("arrTable"))

menuControl.init()

const standby = new Standby()

const split = new Split()

calculate.events.on("startCalculation",()=>{
    getInputData.getInput()
    
})
let splitIncrease = 0
//let standbyDeduction
getInputData.events.on("inputDataProcessed",(exceptionValues)=>{
    splitIncrease=split.calculate(exceptionValues)
    standby.calculate(exceptionValues)
    lookup.lookupMax()
})


lookup.events.on("lookupCompleted",(maxFDP)=>{
    calculate.eta(maxFDP,splitIncrease)
})

