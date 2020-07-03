const app = require("express")();
const http = require("http").Server(app);
const port = process.env.PORT || 8080;
const path = require('path');
const Lobby = require('./classes/lobby');
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());

// socket logic
var lobby = new Lobby(http);  

//routes
var homeRouter = require('./routes/home');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//routes entry points
app.use('/',homeRouter)


app.post('/notifications', function(req, res) {
  
    lobby.sendNotications(req.body.notifications);

    res.send();
  });




//server start
http.listen(port, function() {
    console.log("Listening on *:" + port);
});