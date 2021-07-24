var mysql = require('mysql');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var connection = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "",
  database : "workindia",
  port: "3306"
}); 

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  // Uncomment below lines for first time to create a table in database
//   var sql = "CREATE TABLE users (username VARCHAR(255), password VARCHAR(255))";
//   connection.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
  console.log('connected to Database');
});

exports.register = async function(req,res){
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, saltRounds)

  var users={
     "username":req.body.username,
     "password":encryptedPassword
   }
  
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
    if (error) {
      res.send({
        "failed":"error ocurred"
      })
    } else {
      res.send({
        "status":"account created"
          });
      }
  });
}

exports.login = async function(req,res){
  var username= req.body.username;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE username = ?',[username], async function (error, results, fields) {
    if (error) {
      res.send({
        "failed":"error ocurred"
      })
    }else{
      if(results.length >0){
        const comparision = await bcrypt.compare(password, results[0].password)
        if(comparision){
            res.send({
              "status":"success",
              "userId":username
            })
        }
        else{
          res.send({
               "success":"Username and password does not match"
          })
        }
      }
      else{
        res.send({
          "success":"Username does not exits"
            });
      }
    }
    });
}