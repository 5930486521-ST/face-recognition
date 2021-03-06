const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// var knex = require('knex')({
//     client : "pg",
//     connection: {
//         connectionString: process.env.DATABASE_URL,
//         ssl: true,
//     }
// });

const DB_PASSWORD = process.env.DB_PASSWORD ;
const options = {
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'face-recognition'
    }
}
const knex = require('knex')(options);

var app = express();
app.use(cors());
app.use(bodyParser.json())

const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

app.get('/',  (req, res) => {
    knex("signin").select("*").then(userArray =>  res.json(userArray));
});

app.get('/user',  (req, res) => {
    knex("user").select("*").then(userArray =>  res.json(userArray));
});

app.post("/regis",(req, res) => {
    const {name,email,pass,repass} = req.body;
    var hash = bcrypt.hashSync(pass, salt);
    const newUser = {
            email : email,
            name : name,
            entries : "0",
            joined : new Date()};
    knex.transaction(trx =>{
        trx("user").insert(newUser)
         .then( iduser => {
            return trx("signin").insert({email : email,
                hashedPass : hash})
         })
         .then(trx.commit)
         .catch(trx.rollback)
         .then(() => res.json(newUser))
    });
})

app.post("/signin",(req, res) => {
    knex.select("*").from("signin").where({email : req.body.email})
        .then(siginArray => {
            if (bcrypt.compareSync(req.body.pass, siginArray[0].hashedPass)){
                knex("user").select("*").where({email : req.body.email})
                    .then(dataArray => res.status(200).json(dataArray[0]));
            }else res.status(401).json("wrong credential");
        }).catch(err => res.status(400).json(err));
})

app.put("/image",(req, res) => {
    var {userInfo,addedEnties} = req.body;
    var updatedEntries = Number(userInfo.entries) + addedEnties;
    userInfo.entries = updatedEntries;
    knex("user").where({idUser : userInfo.idUser}).update({entries :updatedEntries}).catch(console.log);
    res.json(userInfo);
});
   
app.listen(process.env.PORT || 8000);