const express = require('express')
const mysql = require('mysql')
const cors = require("cors")
const bparser = require("body-parser")

// connect to mysql
const db = mysql.createPool({
    host : "127.0.0.1",
    user : "root",
    password : "password",
    database : "todoapp", // this is name of database having 'todos' table in it
})
db.query(() => {
    console.log("database connected")
})

// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
// flush privileges;
// // run these command if (Error: ER_NOT_SUPPORTED_AUTH_MODE) error occurred


var app = express()

app.use(cors())
app.use(bparser.json())

app.get('/' , (req,res) => {
    var sql = 'SELECT * FROM todos' // comand to get all data from database
    db.query(sql , (err,result) => {
        if(err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})

app.get('/finddata/:id' , (req,res) => {
    var sql = `SELECT * FROM todos WHERE id = ${req.params.id}` // find data if id match 
    db.query(sql , (err,result) => {
        if(err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})

app.post('/adddata' , (req,res) => {
    var sql = "INSERT INTO todos (name, body, status) VALUES (?, ?, 0)"   // insert data to table
    db.query(sql, [req.body.name, req.body.body] , (err,result) => {  // pass data inside [] that will take ? space in command
        if(err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})

app.put('/updatedata/:id' , (req,res) => {
    var sql = `UPDATE todos SET ? WHERE id = ${req.params.id}`  // update data in table
    db.query(sql, [req.body] , (err,result) => {  // pass data inside [] that will take ? space in command
        if(err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})

app.delete('/deletedata/:id' , (req,res) => {
    var sql = `DELETE FROM todos WHERE id = ${req.params.id}`  // delete data from table
    db.query(sql , (err,result) => {
        if(err) {
            res.send(err)
        } else {
            res.send(result)
        }
    })
})


app.listen(8001, () => {
    console.log("app is running")
})