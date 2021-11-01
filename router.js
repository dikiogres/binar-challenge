const express = require('express');
const router = express.Router();
const user = require('./db/posts.json')

//let posts = require('./posts.json');

router.use((req, res, next) => {
    console.log('Time: ', new Date(Date.now()));
    next()
})

router.use(express.static('public'));

router.get('/', (req,res)=>{
    res.render('index');
})

router.get('/suit-game', (req,res)=>{
    res.render('suit-game');
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', (req, res) => {
    const {email, password} = req.body;
    const getEmail = user.find(x => x.email === email);
    const getPassword = user.find(x => x.password === password);
    //let getUsername = user.find(x => x.username === username);
    if(!getEmail){
        res.json("Email not found!");
    }
    else if(getEmail && !getPassword){
        res.json("Wrong Password!");
    }
    else{
        res.json(getEmail);
    }

})

router.use((req,res)=>{
    res.status(404).render('404');
})


module.exports = router;