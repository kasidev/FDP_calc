"use strict"

const http = require("http")
const url = require("url")
const path = require("path")
const fs = require("fs")
const mimeTypes = require("mime-types")

module.exports = function(parsedUrl, res) {
    const sanitizePath = path.normalize(parsedUrl.pathname.substr(7)).replace(/^(\.\.[\/\\])+/, '')
    const absPath = path.join(__dirname, "../", "public",sanitizePath)
    //console.log("abs path:",absPath)

    fs.exists(absPath,(exists)=>{
      if(!exists){
        // file does not exist
        res.writeHead(404, {
          "Content-Type": "text/html"
        })
    
          res.write("<strong>404 not found</strong>")
          res.end()
          return
  
      }
      // read in file
      fs.readFile(absPath,(err,content) => {
        if(err){
          res.writeHead(500, {
            "Content-Type": "text/html"
          })
      
            res.write("<strong>404 not found</strong>")
            res.end()
            return
    
        }
        res.writeHead(200, {
          "Content-Type": mimeTypes.lookup(sanitizePath)
        })
        res.write(content)
        res.end()
        return
      })
    })
    
    return
}