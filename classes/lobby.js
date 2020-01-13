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
            socket.on("disconnect",(data)=>{
             this.clients.remove(socket.id);
            });
        });
    }
     sendNotications(notifications) {
         
        console.log("sent");
       for (const index in notifications) {
          var socket_id = this.clients.find(notifications[index]);
          this.io.to(socket_id).emit("notice",notifications[index]);
       }
       
         
    }
}
module.exports=Lobby;