class Client{
    constructor(username,socket)
    {
        this.username=username;
        this.socket_id= socket.id;
        this.key= this.socket_id.charCodeAt(0);
        this.next =null;
    }
}
module.exports=Client;