const express = require('express');
const bcrypt =require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const database ={
    users:[
        {
            id :'123',
            name: 'John',
            email:'John@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id :'124',
            name: 'Ali',
            email:'Ali@gmail.com',
            password: '123',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/',(req,res) => {
    res.send(database.users);
});

app.post('/signin',(req,res) => {
    if(req.body.email === database.users[1].email &&
        req.body.password === database.users[1].password){
            res.json('success');
        }else{
            //res.status(400).json("error logging innnnnn");
            res.json("error logging innnn");
        }
});

app.post('/register',(req,res) => {
    const {email, name, password} = req.body;
    database.users.push({
        id :'125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date() 
    });
    res.json(database.users[database.users.length-1]);
});

app.get('/profile/:id',(req,res)=>{
    const {id} = req.params;
    let found = false;
    database.users.forEach( user => {
        if(user.id === id){
            found = true;        
            res.json(user);
        } 
    })
    if (!found){
        res.status(404).json('no such user');
    }
    
});

app.post('/image',(req,res) =>{
    const {id} = req.body;
    let found = false;
    database.users.forEach( user => {
        if(user.id === id){
            found = true;  
            user.entries++;      
            return res.json(user.entries);
        } 
    })
    if (!found){
        res.status(404).json('not found');
    }
});

app.listen(3000,() => {
    console.log('app is runinng on port 3000');
});

/*
 root: / --> get request --> res = this is working
 /signin --> post request --> res = success/fail
 /register --> post request --> res = user object
 /profile/ : userId --> get request --> res = user object
 /image  ---> put request --> res = updated user object

*/