var express = require("express");
var loginroutes = require('./routes/loginRoutes');
var bodyParser = require('body-parser');
const e = require("express");

// Env Variables
require('dotenv').config()

var app = express();
var router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Allow cross origin requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const secretKey = "1234";

// test route with secret key
router.get('/', function(req, res) {
    const key = req.body.key;
    if(key==secretKey)
        res.json({ message: 'Welcome to WorkIndia Assignment API' });
    else{
        res.json({ message: 'Plese provide correct Secret key' });
    }
});

// API endpoint to handle Login
router.post('/app/user/auth',loginroutes.login);

// API endpoint to handle Register
router.post('/app/user',loginroutes.register);

app.use('/', router);

// Port declaration to run server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running at Port: ${port}`);
  });