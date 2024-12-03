const express = require('express')
const socket = require("socket.io")
const http = require("node:http")

const app = express()

const server = http.createServer(app)

const io = new socket.Server(server,{
    cors:{
        origin:"*",
        methods:['POST','GET']
    }
})

app.get("/",function(req,res){
    res.send("Server Ready")
})

io.on('connection',function(socket){
    socket.on("offer",function(message){
        socket.broadcast.emit("offer",message)
    })
    socket.on("answer",function(message){
        socket.broadcast.emit("answer",message)
    })
    socket.on("new-ice-candidate",function(icecandidate){
        socket.broadcast.emit("new-ice-candidate",icecandidate)
        console.log(icecandidate)
    })
})

server.listen(3000,function(){
    console.log("server started")
})

module.exports = app