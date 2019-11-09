const app = require("express")();
const http = require("http").Server(app);
const port = process.env.PORT || 3000;
const path = require('path');
const Lobby = require('./classes/lobby');


//routes
var homeRouter = require('./routes/home');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//routes entry points
app.use('/',homeRouter)

// socket logic
new Lobby().setUp(http);  




//server start
http.listen(port, function() {
    console.log("Listening on *:" + port);
});