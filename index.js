//Setup del servidor
const express = require("express");
const app = express();
const http = require("http").Server(app);
const PORT = process.env.PORT || 3000
//Agrego socket.io
const io = require("socket.io")(http);

//Enviar cliente html
app.get("/", (req, res)=>{
    res.sendfile(__dirname + "/public/index.html");
});

//Escuchando en el socket por mensajes
io.on("connection", (socket)=>{
    socket.on("chat message", msg=>{
        io.emit("chat message", msg);
        console.log("Mensaje:", msg);
    })
});

http.listen(PORT, ()=>{
    console.log(`Server corriendo en PORT ${PORT}...`);
})