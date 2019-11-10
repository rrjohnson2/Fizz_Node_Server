class ClientHashMap{
    constructor()
    {
        this.map_array=[];
        this.size = 0;
        this.capacity=10;
        this.modulus =10;
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
        

    }
    remove(socket_id)
    {
        if(!socket_id)
        {
            return;
        }
        var removed=false;
        var key = socket_id.charCodeAt(0);
        var mod = key % this.modulus;
        var pointer = this.map_array[mod];

        if (pointer.socket_id == socket_id) {
            pointer = pointer.next;
            removed = true;
        } else {
            while(pointer!=null)
            {
                var next = pointer.next;
                if(next.socket_id == socket_id)
                {
                    next = next.next;
                    break;
                }
            }   
            removed = true;
        }

        if (removed)
        {
                console.log("goodbye bitch");
        }
        else{
            console.log("couldn't remove that asshole");
        }

    }
    isFull()
    {
        return this.size >= this.capacity;
    }
}
module.exports=ClientHashMap;