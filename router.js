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
//create
router.get('/create', async(req,res) => {
    await res.render('create')
})

router.post('/create', async(req,res) =>{
    const {username,password} = req.body
    try{
        const user = await User.create({username,password})
        return res.redirect('/admin')
    }
    catch(err){
    console.log(err)
        return res.status(500).json(err)
    }
})

//read
router.get('/admin', (req,res) => {
    User.findAll()
     .then(articles => {
         res.render('articles/main', {
             articles
         })
     })
 })

//update
router.get('/edit/:id', async(req,res) => {
   const {id} = await req.params;
   const user = await User.findOne({
       where:{
           id:id
       },
       
       raw:true
       
   }).catch(error=> console.log(error))
     res.render('edit',{user})

})


router.post('/update/:id', async(req,res) => {
  const {id} = req.params;
  const data = req.body;
  const selector = {where: {id:id}}
  await User.update(data,selector).catch(error=>console.log(error))

     res.redirect('/admin')
})


//delete
router.get('/delete/:id', async(req,res) => {
    const {id} = await req.params;
    const user = await User.destroy({
        where:{
            id:id
        },
        
        raw:true
        
    }).catch(error=> console.log(error))
    
    res.redirect('/admin')
 
 })

router.use((req,res)=>{
    res.status(404).render('404');
})


module.exports = router;