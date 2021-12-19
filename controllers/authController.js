const { User } = require('../models')


function format(user) {
    const{ id,username }  = user
    return {
        id, 
        username,
        accessToken : user.generateToken ()
    }
}

module.exports = {
    login: (req,res) => {
        User.authenticate(req.body)
           .then(user => {
               res.json(
                   format(user)
               )
           })
    },
    whoami: (req,res) => {
        const currentUser = req.user;
        res.json(currentUser)
    },
}