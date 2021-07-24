var express = require("express");
var loginroutes = require('./routes/loginRoutes');
var bodyParser = require('body-parser');


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


// test route
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to WorkIndia Assignment API' });
});


router.post('/app/user/auth',loginroutes.login);
router.post('/app/user',loginroutes.register);

app.use('/', router);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running at Port: ${port}`);
  });