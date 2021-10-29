const express = require('express');
const router = express.Router();

router.use(express.static('public'));

router.get('/', (req,res)=>{
    res.render('index');
})

router.get('/suit-game', (req,res)=>{
    res.render('suit-game');
})

router.use((req,res)=>{
    res.status(404).render('404');
})

module.exports = router;