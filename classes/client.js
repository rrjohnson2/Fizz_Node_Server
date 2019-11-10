class Client{
    constructor(id,socket)
    {
        this.id=id;
        this.socket=socket;
        this.next =null;
    }
}
module.exports=Client;