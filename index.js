const app = require("express")();
const http = require("http").Server(app);
const port = process.env.PORT || 3000;
const path = require('path');
const Lobby = require('./classes/lobby');
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());

// socket logic
new Lobby(http);  

//routes
var homeRouter = require('./routes/home');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//routes entry points
app.use('/',homeRouter)


app.post('/notifications', function(req, res) {
    console.log(req.body);
    console.log(req.params);

    res.send();
  });



//server start
http.listen(port, function() {
    console.log("Listening on *:" + port);
});