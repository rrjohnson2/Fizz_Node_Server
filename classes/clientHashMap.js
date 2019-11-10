class ClientHashMap{
    constructor()
    {
        this.map_array=[];
        this.size = 0;
        this.capacity=4;
        this.modulus =10;
    }
    add(client)
    {
        if(this.isFull())
        {
            console.log("lobby is full");
            return;
        }

        var mod = client.id % this.modulus;

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
         console.log(client.id +" added!!!")
        

    }
    remove(client)
    {

    }
    find(id)
    {

    }
    isFull()
    {
        return this.size >= this.capacity;
    }
}
module.exports=ClientHashMap;