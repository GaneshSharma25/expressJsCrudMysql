const express = require('express');
const router = express.Router();
const connection = require("../db/dbConnect");

router.get("/employee" , function(req,resp){
    connection.query("select * from employee",(err,data,fields)=>{
        if(err){
            resp.status(500).send("no data found .." +JSON.stringify(err))
        }else{
           resp.render("index",{empdata:data}) 
        }
    })
})

router.get("/displayAddForm",function(req,resp){
    resp.render("add-emp")
})

router.get("/addEmployee", function(req,resp){
    var empid = req.query.empid;
    var ename = req.query.ename;
    var sal = req.query.sal;
    connection.query("insert into employee values(?,?,?)",[empid,ename,sal],(err)=>{
        if(err){
            resp.status(500).send("data not added.."+JSON.stringify(err))
        }else{
            resp.redirect("/employee")
        }
    });
})

router.get("/edit/:id",function(req,resp){
  //  var empid = req.query.empid;
  //  console.log(empid)
    connection.query("select * from employee where empid = ?",[req.params.id],(err,data)=>{
        if(err){
            resp.status(500).send("Error: "+JSON.stringify(err));
        }else{
            resp.render("update-emp" ,{emp:data[0]})
            console.log(data);
        }
    })
})

router.post("/updateEmployee",(req,resp)=>{
    var empid = +(req.body.empid)
    var ename = req.body.ename;
    var sal = +(req.body.sal);
    connection.query("update employee set ename = ?,sal = ? where empid = ?",[ename,sal,empid],(err,data)=>{
        if(err){
            resp.status(500).send("Error: "+JSON.stringify(err))
        }else{
            resp.redirect("/employee")
        }
    })
})

router.get("/delete/:id",(req,resp)=>{
    connection.query("delete from employee where empid = ?",[req.params.id],(err,result)=>{
        if(err){
            resp.status(500).send("Error: "+JSON.stringify(err))
        }else{
            resp.redirect("/employee")
        }
    })
})



module.exports = router;