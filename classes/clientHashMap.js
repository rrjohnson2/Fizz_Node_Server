const axios = require('axios')
class ClientHashMap{
    constructor()
    {
        this.map_array=[];
        this.size = 0;
        this.capacity=10;
        this.modulus =10;
        this.host = "http://localhost:8080";
        this.add_client_path="/clientActivated";
        this.remove_client_path = "/clientDeactivated";
    }
    add(client)
    {
        if(this.isFull())
        {
            console.log("lobby is full");
            return;
        }

        var mod = client.key  % this.modulus;

         if(this.map_array[mod] ==null)
         {
            this.map_array[mod] = client;
         }
         else{
            var pointer =this.map_array[mod];

            while(pointer.next!=null)
            {
                pointer=pointer.next;
            }
            pointer.next = client;
         }
         this.size++;
         console.log(client.key+" added!!!")
         
         axios.post(this.host+this.add_client_path,
            {
                username: client.username,
                key: client.key
            });
        

    }
    remove(socket_id)
    {
       
        var removed;
        var key = socket_id.charCodeAt(0);
        var mod = key % this.modulus;
        var pointer = this.map_array[mod];
        var username;

        if(pointer==null)
        {
            removed = false;
        }
        else if (pointer.socket_id == socket_id) {
            username = pointer.username;
            this.map_array[mod] = pointer.next;
            removed = true;
        } else {
            while(pointer!=null)
            {
                var next = pointer.next;
                if(next.socket_id == socket_id)
                {
                    username = next.username;
                    next = next.next;
                    removed = true;
                    break;
                }
            }   
        }

        if (removed)
        {
              console.log("removed"+ key); 
              axios.post(this.host+this.remove_client_path,
                {
                    username: username
                }); 
        }
        

    }
    isFull()
    {
        return this.size >= this.capacity;
    }
}
module.exports=ClientHashMap;