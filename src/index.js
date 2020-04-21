"use strict"
require("../scss/index.scss")

const GetInputData = require("./controllers/GetInputData")
const Calculate = require("./controllers/Calculate")
const Lookup = require("./controllers/Lookup")
const dataTimes = require("./data/times.json")

let input_data=  {
    "regulation" : document.getElementById("regulationInput"),
    "tz" : document.getElementById("timezoneInput"),
    "stdb" : document.getElementById("standbyInput"),
    "fdpStartDate" : document.getElementById("fdpstartDateInput"),
    "fdpStartTime": document.getElementById("fdpstartTimeInput"),
    "legs" : document.getElementById("legsInput"),
    "dep" : document.getElementById("departureLocationInput"),
    "arr" : document.getElementById("arrivalLocationInput"),
    "split" : document.getElementById("splitdutyInput"),
    "splitStart" : document.getElementById("splitdutystartInput"),
    "splitEnd" : document.getElementById("splitdutyendInput"),
}

const getInputData = new GetInputData(input_data)

const lookup = new Lookup(input_data)

//getInputData.startToLocal()

const calculate = new Calculate(input_data,
    document.getElementById("calculateButton"))

calculate.init()

calculate.events.on("startCalculation",()=>{
    getInputData.getInput()
})

getInputData.events.on("inputDataProcessed",()=>{
    lookup.lookupMax()
})

lookup.events.on("lookupCompleted",(maxFDP)=>{
    calculate.eta(maxFDP)
})

