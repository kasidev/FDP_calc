"use strict"

const http = require("http")
const url = require("url")
const path = require("path")
const fs = require("fs")
const mimeTypes = require("mime-types")
const servPublic = require("./public")
const serverLog = require("../src/data/serverLog.json")
//const requestIp=require("request-ip")

//const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '')

let counter = 93
const app = http.createServer((req, res) => {

  counter+=1
  //console.log(req.headers.host)
  //console.log(counter)
  //console.log(requestIp.getClientIp(req))
  const reqLog={
    "id": counter,
    "req": req,
    //"ip": requestIp.getClientIp(req)
  }
  serverLog.push(reqLog)
  //console.log(serverLog)
  //fs.writeFile('../src/data/serverLog`＄{}`.json"',serverLog)

  const parsedUrl = url.parse(req.url)
  console.log(parsedUrl.pathname)
  if(parsedUrl.pathname.substr(0,8)==="/public/"){
    
    servPublic(parsedUrl,res)
    return

  }if(parsedUrl.pathname ==="/favicon.ico"){
    console.log("favicon request")
    const favicoPath=path.join(__dirname, "../", "public/favicon.ico")

    const icon= fs.readFile(favicoPath,(err,content) => {
      if (err){
        res.writeHead(404,{})
        res.write("error")
        res.end()
        return
      }res.writeHead(200, {
        "Content-Type": mimeTypes.lookup(favicoPath)
      })
  
        res.write(content)
        res.end()
        return
    })
  }

  else{
    console.log("file loading error")
    const errorPath=path.join(__dirname, "../", "public/matrix.jpg")

    const errorFile= fs.readFile(errorPath,(err,content) => {
      if (err){
        res.writeHead(404,{})
        res.write("error")
        res.end()
        return
      }res.writeHead(200, {
        "Content-Type": mimeTypes.lookup(errorPath)
      })
  
        res.write(content)
        res.end()
        return
    })
  }

    
}) 
let port = (process.env.PORT || 8080)
app.listen(port)