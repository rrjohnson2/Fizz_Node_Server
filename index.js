const app = require("express")();
const http = require("http").Server(app);
const port = process.env.PORT || 3000;
const path = require('path');
const io = require('socket.io')(http);

//routes
var homeRouter = require('./routes/home');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//routes entry points
app.use('/',homeRouter)

// socket logic 
io.on("connection",(socket)=>{
    console.log(socket);

    //client sent message
    socket.on("message",(message)=>{
        console.log(message);
    })
})


//server start
http.listen(port, function() {
    console.log("Listening on *:" + port);
});