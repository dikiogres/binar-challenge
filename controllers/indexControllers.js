const { User } =  require('../models')

module.exports = {
    create : async(req,res) => {
        const {username, password} = req.body
        try{
            const user = await User.create({username, password})
            return res.redirect('/admin')
        }
        catch(err){
            return res.status(500).json(err)
        }
    },
    read : async(req,res) => {
        User.findAll()
        .then(articles =>{
            res.render('articles/main', {
                articles
            })
        })
    },
    updateGet : async(req,res) => {
        const {id} = await req.params;
        const user = await User.findOne({
            where:{
                id:id
            },
            raw: true
        }).catch(error=> console.log(error))
          res.render('edit',{user})

    },
    updatePost : async(req,res) => {
        const {id} = req.params;
        const data = req.body;
        const selector = {where: {id:id}}
        await User.update(data,selector).catch(error=>console.log(error) )
        res.redirect('/admin')
    },
    delete : async(req,res) => {
        const {id} = await req.params;
        const user = await User.destroy({
            where:{
                id:id
            },
            raw:true
        }). catch(error => console.log(error))
        res.redirect('/admin')
    },
    register: (req,res, next) => {
        User.register(req.body)
          .then(() => {
              res.redirect('/login')
          })
          .catch(err => next(err))
    },
}