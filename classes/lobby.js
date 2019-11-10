const Client = require('./client');
const ClientHashMap = require("./clientHashMap");

class Lobby{
    constructor(http) {
        this.io= require('socket.io')(http);
        this.clients= new ClientHashMap();

        this.io.on("connection",(socket)=>{
            socket.on("join",(username)=>{
                this.clients.add(new Client(username,socket));
               // console.log(this.clients);
            });
            socket.on("disconnect",(socket)=>{
             this.clients.remove(socket.id);
            });
        });
    }
}
module.exports=Lobby;