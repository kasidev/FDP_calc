"use strict"
require("../scss/index.scss")

const GetInputData = require("./controllers/GetInputData")

const getInputData = new GetInputData(
    {
        "regulation" : document.getElementById("regulationInput").value,
        "tz" : document.getElementById("timezoneInput").value,
        "stdb" : document.getElementById("standbyInput").checked,
        "fdpStartDate" : document.getElementById("fdpstartDateInput").value,
        "fdpStartTime": document.getElementById("fdpstartTimeInput").value,
        "legs" : document.getElementById("legsInput").value,
        "dep" : document.getElementById("departureLocationInput").value,
        "arr" : document.getElementById("arrivalLocationInput").value,
        "split" : document.getElementById("splitdutyInput").checked,
        "splitStart" : document.getElementById("splitdutystartInput").value,
        "splitEnd" : document.getElementById("splitdutyendInput").value,
    }
)

getInputData.startToLocal()
