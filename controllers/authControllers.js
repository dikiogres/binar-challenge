const { User } = require('../models')
const passport = require('../lib/passport')

module.exports = {
    
    loginGet: async(req,res) => {
        const {id} = await req.params;
        const user = await User.findOne({
            where:{
                id:id
            },
            raw: true
        }).catch(error=> console.log(error))
          res.render('login',{user})

    },
    loginPost: passport.authenticate('local', {
        successRedirect: '/game',
        failureRedirect: '/login',
        failureFlash: true 
        }),
}