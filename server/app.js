"use strict"

const http = require("http")
const url = require("url")
const path = require("path")
const fs = require("fs")
const mimeTypes = require("mime-types")
const servPublic = require("./public")

//const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '')



const app = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url)
  console.log(parsedUrl.pathname)
  if(parsedUrl.pathname.substr(0,8)==="/public/"){
    
    servPublic(parsedUrl,res)
    return

  }else{
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

app.listen(8090)