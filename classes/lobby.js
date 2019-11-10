const Client = require('./client');
const ClientHashMap = require("./clientHashMap");

class Lobby{
    constructor(http) {
        this.io= require('socket.io')(http);
        this.clients= new ClientHashMap();

        this.io.on("connection",(socket)=>{
            socket.on("join",(id)=>{
                this.clients.add(new Client(id,socket));
                console.log(this.clients);
            });
        });
    }
}
module.exports=Lobby;