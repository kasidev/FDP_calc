"use strict"

const http = require("http")
const url = require("url")
const path = require("path")
const fs = require("fs")
const mimeTypes = require("mime-types")
const servPublic = require("./public.js")
const serverLog = require("../src/data/serverLog.json")
//const requestIp=require("request-ip")

//const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '')

let counter = 11
const app = http.createServer((req, res) => {

  

  const parsedUrl = url.parse(req.url,true)
  if (parsedUrl.pathname==="/public/index.html") {
    counter+=1
    let now = new Date(Date.now())
    console.log(now.toString())
    console.log(counter)
    
  }
  console.log("parsedurl:",parsedUrl.pathname)
  
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