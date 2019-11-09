class Lobby{
      setUp(http) {
        this.io= require('socket.io')(http);
        
        this.io.on("connection",(socket)=>{

            //client sent message
            socket.on("join",(message)=>{
                console.log(message);
            })
        
            console.log("a user is connecting");
        });
    }
}
module.exports=Lobby;