const mysql = require("mysql2");

//create connection 
var mysqlconnection = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'ganesh123',
    database:'test1',
    port:3306
});

mysqlconnection.connect((err) => {

    if(err){
        console.log("connection failed "+JSON.stringify(err))
    }else{
        console.log("connection done succesfully");
    } 
})

module.exports = mysqlconnection;